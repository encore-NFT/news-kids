from airflow.models import DAG
from airflow.models import Variable
from airflow.sensors.external_task_sensor import ExternalTaskSensor
from airflow.contrib.operators.ssh_operator import SSHOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'admin',
    'depends_on_past': False,
    'start_date': datetime(2022, 3, 29),
    'catchup': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=1),
}

templated_bash_command_scrapy = """
    su - {{params.user}}
    cd {{params.scrapy_env_dir}}
    source ./.venv/bin/activate
    cd {{params.scrapy_project_dir}}
""" 

with DAG(
    "kid_news_thumbnail",
    schedule_interval="30 16 * * *",
    default_args=default_args,
    catchup=False,
    params={
    # params for scrapy
        "user": "scrapy",
        "scrapy_env_dir": "/home/scrapy/thumbnail",
        "scrapy_project_dir": "/home/scrapy/thumbnail/kidnewsthumbnail"
    }

) as dag:
    # task to check whether task "kid_news_modeling" is executed from DAG "kid_news_summary"
    summary_sensor = ExternalTaskSensor(
        task_id="summary_sensor",
        external_dag_id="kid_news_summary",
        external_task_id="kid_news_modeling",
        execution_date_fn=lambda x: x - timedelta(minutes=30),
        mode='reschedule',
        timeout=3600
    )

    # task for getting thumbnail
    kid_news_get_thumbnail = SSHOperator(
        task_id="kid_news_get_thumbnail",
        ssh_conn_id="ssh_scrapy",
        command=f'{templated_bash_command_scrapy} python3 get_thumbnail.py',
        dag=dag
    )

    # task for uploading thumbnail to s3
    kid_news_upload_thumbnail_s3 = SSHOperator(
        task_id="kid_news_upload_thumbnail_s3",
        ssh_conn_id="ssh_scrapy",
        command=f'{templated_bash_command_scrapy} python3 upload_thumbnail_s3.py',
        dag=dag
    )

    # task for uploading(inserting) data into rds 
    kid_news_upload_thumbnail_rds = SSHOperator(
        task_id="kid_news_upload_thumbnail_rds",
        ssh_conn_id="ssh_scrapy",
        command=f'{templated_bash_command_scrapy} python3 upload_thumbnail_rds.py',
        dag=dag
    )

summary_sensor >> kid_news_get_thumbnail >> kid_news_upload_thumbnail_s3 >> kid_news_upload_thumbnail_rds