from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from googleapiclient.discovery import build
from sqlalchemy import MetaData, Table, insert
import requests
import json
import os
import boto3
import shutil
import re


def get_credentials():
    res = {}
    with open(f'{os.path.dirname(os.path.realpath(__file__))}/.credentials.json', "r") as credentials:
        credentials = json.load(credentials)
    return credentials


def get_id_title():
    """return id and news_title of today's news"""
    AWS_RDS_URL = get_credentials()["AWS_RDS_URL"]

    try:
        engine = create_engine(AWS_RDS_URL)
        q_result = engine.execute(
            """
            SELECT * FROM news
            WHERE news_date >= DATE_FORMAT((NOW() + INTERVAL 9 HOUR), '%%Y-%%m-%%d 00:00:00')
            """
        )
        results = q_result.fetchall()
        res = [(row[0], row[4]) for row in results]
        return res

    except SQLAlchemyError as e:
        return type(e)
    

def get_thumbnail(q_result):
    """get thumbnail image and the url as csv"""

    # youtube build info
    YOUTUBE_API_SERVICE_NAME = "youtube"
    YOUTUBE_API_VERSION = "v3"
    DEVELOPER_KEY = get_credentials()["DEVELOPER_KEY"]
    
    # get youtube Object
    youtube = build(
        YOUTUBE_API_SERVICE_NAME,
        YOUTUBE_API_VERSION,
        developerKey=DEVELOPER_KEY
    )

    # search by title
    for news_id, title in q_result:
        search_response = youtube.\
            search().\
            list(
                q=title,
                order="relevance",
                part="snippet",
                maxResults=3
            ).\
            execute()

        # save thumbnails per news
        img_name = [f'{news_id}_img{i}.jpg' for i in range(1,len(search_response["items"])+1)]
        for i in range(len(search_response["items"])):
            img_url = search_response["items"][i]["snippet"]["thumbnails"]["high"]["url"]
            img_data = requests.get(img_url).content
            
            os.makedirs(f'{os.path.dirname(os.path.realpath(__file__))}/img', exist_ok=True)
            with open(f'{os.path.dirname(os.path.realpath(__file__))}/img/{img_name[i]}', 'wb') as handler:
                handler.write(img_data)


def get_records():
    """get image info as dict"""
    S3_IMG_PATH = get_credentials()["S3_IMG_PATH"]
    PATH = f'{os.path.dirname(os.path.realpath(__file__))}/img'
    return [{"id": 0, "thumbnail_url": f'{S3_IMG_PATH}{f}', "news_id": f[0]} for f in sorted(os.listdir(PATH))]


def upload_s3(records):
    """upload image into s3"""
    credentials = get_credentials()
    AWS_ACCESS_KEY_ID = credentials["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = credentials["AWS_SECRET_ACCESS_KEY"]
    BUCKET_NAME = credentials["BUCKET_NAME"]
    S3_IMG_PATH = credentials["S3_IMG_PATH"]

    s3 = boto3.resource(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )

    for record in records:
        PATH = os.path.dirname(os.path.realpath(__file__))
        FILE_NAME = re.search(r"(?<=\/).*", record["thumbnail_url"]).group(0)
        with open(f'{PATH}/img/{FILE_NAME}', "rb") as img:
            s3.Bucket(BUCKET_NAME).put_object(
                Key = record["thumbnail_url"],
                Body = img
            )


def upload_rds(records):
    """upload s3 key of image to rds and delete images"""
    AWS_RDS_URL = get_credentials()["AWS_RDS_URL"]

    try:
        engine = create_engine(AWS_RDS_URL)
        metadata = MetaData(bind=engine)
        mytable = Table('thumbnails', metadata, autoload=True)

        with engine.connect() as conn:
            result = conn.execute(
                insert(mytable),
                records
            )

    except SQLAlchemyError as e:
        return type(e)
    
    
def delete_img_dir():
    PATH = f'{os.path.dirname(os.path.realpath(__file__))}/img'
    if os.path.isdir(PATH):
        shutil.rmtree(PATH, ignore_errors=True)
