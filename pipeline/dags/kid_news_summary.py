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

with DAG(
    "kid_news_summary",
    schedule_interval="00 16 * * *",
    default_args=default_args,
    catchup=False
) as dag:
    # task to check whether task "kid_wordcount" is executed from DAG "kid_news_wordcount"
    wordcount_sensor = ExternalTaskSensor(
        task_id="wordcount_sensor",
        external_dag_id="kid_news_wordcount",
        external_task_id="kid_wordcount",
        execution_date_fn=lambda x: x - timedelta(minutes=30),
        mode='reschedule',
        timeout=3600
    )

    # task for kid news scraping
    kid_news_modeling = SSHOperator(
        task_id="kid_news_modeling",
        ssh_conn_id="ssh_pytorch",
        command="cd /notebooks && python3 summarization.py",
        dag=dag
    )

wordcount_sensor >> kid_news_modeling
