from pyspark.sql import SparkSession
from pyspark.sql.types import ArrayType, StringType
import pyspark.sql.functions as F
from pyspark.sql import types as T
from typing import List, Set
from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize
import urllib.parse
import urllib.request
import ssl
import json
from datetime import datetime, timedelt
import re
from konlpy.tag import Mecab
m = Mecab()

@F.udf(T.ArrayType(T.StringType()))
def ko_normalize(article:str) -> List[str]:
    """return lists of normalized sentences in the article"""
    # get stop words
    with open("/opt/workspace/stop_words/korean_stop_words.txt", "r") as f:
        stopwords = {re.sub("\n", "", line) for line in f.readlines()}
    #
    return [normalize(sentence, english=True, number=True) for sentence in article.split("\n")]


@F.udf(T.StringType())
def get_keyword(article_list: List[str]) -> str:
    """return keyword form article"""
    wordrank_extractor = KRWordRank(
        min_count = 1, 
        max_length = 10,
        verbose = True
        )
    # parameter for worrank
    beta = 0.85
    max_iter = 10
    
    # get keyword
    keywords, rank, graph = wordrank_extractor.extract(article_list, beta, max_iter)
    keyword = sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:1][0][0]
    
    # return only nouns
    token = m.pos(keyword)[0]
    if token[1] == "NNG" or token[1] == "NNP":
        return token[0]
    return


@F.udf(T.StringType())
def get_definition(keyword: str, KOREAN_API_URL: str) -> str:
    """return definition from keyword"""
    ssl._create_default_https_context = ssl._create_unverified_context

    # make url for get json result from api
    url_prefix = KOREAN_API_URL
    search_keyword = urllib.parse.quote(keyword)
    url = url_prefix + search_keyword

    # get result and decode
    req = urllib.request.Request(url)
    result = urllib.request.urlopen(req).read()
    results = json.loads(result.decode('utf-8', 'ignore'))

    # get the noun result from the definition
    for item in results["channel"]["item"]:
        if item["pos"] == "명사":
            return item["sense"]["definition"]
        return "사전에 정의 존재하지 않음"


if __name__ == "__main__":

    # setting for spark-submit
    spark = SparkSession \
        .builder \
        .appName("kid_keyword") \
        .getOrCreate()

    # get credential data
    with open("/opt/workspace/src/.credentials.json", "r") as credential:
        credential = json.load(credential)
        AWS_RDS_URL = credential["AWS_RDS_URL"]
        AWS_RDS_USER = credential["AWS_RDS_USER"]
        AWS_RDS_PASSWORD = credential["AWS_RDS_PASSWORD"]
        KOREAN_API_URL = credential["KOREAN_API_URL"]

    # load data
    today_datetime = (datetime.now() + timedelta(hours=9)).replace(hour=0, minute=0, second=0, microsecond=0)
    today = datetime.strftime(today_datetime, "%Y-%m-%d")
    query = f'(select id, news_article from news where news_date > "{today}") news' # batch
    # query = f'(select id, news_article from news) news' # dump
    df = spark.read.format('jdbc') \
            .option("driver", "com.mysql.cj.jdbc.Driver") \
            .option("url", AWS_RDS_URL) \
            .option("dbtable", query) \
            .option("user", AWS_RDS_USER) \
            .option("password", AWS_RDS_PASSWORD) \
            .load()

    # get keyword by article
    df_keywords = df \
        .withColumn("sentence_list", ko_normalize(df.news_article)) \
        .withColumn("keyword", get_keyword(F.col("sentence_list"))) \
        .filter(F.col("keyword").isNotNull()) \
        .select("id", "keyword")

    # get definition by keyword
    # spark-submit - F.lit(None).cast("string") / pyspark shell - F.lit(0)
    df_final = df \
        .select("id") \
        .join(df_keywords, on="id", how="inner") \
        .withColumn("definition", get_definition(F.col("keyword"), KOREAN_API_URL)) \
        .withColumnRenamed("id", "news_id") \
        .withColumn("id", F.lit(None).cast("string")) \
        .select("id", "keyword", "definition", "news_id")

    # export data
    df_final.write.format("jdbc") \
        .mode("append") \
        .option("driver", "com.mysql.cj.jdbc.Driver") \
        .option("url", AWS_RDS_URL) \
        .option("dbtable", "keyword") \
        .option("user", AWS_RDS_USER) \
        .option("password", AWS_RDS_PASSWORD) \
        .save()
