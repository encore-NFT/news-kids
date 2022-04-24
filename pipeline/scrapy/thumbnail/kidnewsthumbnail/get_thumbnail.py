from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from googleapiclient.discovery import build
import requests

def get_result(RDS_URL):
    try:
    	create_engine(RDS_URL)
        q_result = engine.execute(
        """
        SELECT * FROM news 
        WHERE news_date >= DATE_FORMAT((NOW() + INTERVAL 9 HOUR), '%%Y-%%m-%%d 00:00:00')
        """)
        results = q_result.fetchall()
        result_dict = [r._asdict() for r in results]
        return result_dict
    except SQLAlchemyError as e:
        return type(e)