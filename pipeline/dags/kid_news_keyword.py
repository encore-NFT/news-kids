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

templated_bash_command_pyspark = """
    {{params.spark_submit}} \
    --master {{params.master}} \
    --deploy-mode {{params.deploy_mode}} \
    --num-executors {{params.num_executors}} \
    --executor-cores {{params.executor_cores}} \
    --executor-memory {{params.executor_memory}} \
    --jars {{params.jars}} \
    {{params.application}}
"""

with DAG(
    "kid_news_keyword",
    schedule_interval="00 17 * * *",
    default_args=default_args,
    catchup=False,
    params={
        # params for spark
        "spark_submit": "/opt/spark/bin/spark-submit",
        "master": "yarn",
        "deploy_mode": "client",
        "num_executors": "2",
        "executor_cores": "2",
        "executor_memory": "2048m",
        "jars": Variable.get("keyword_jars"),
        "application": "/opt/workspace/src/kid_keyword_batch.py"
    }

) as dag:
    # task to check whether task "kid_news_modeling" is executed from DAG "kid_news_summary"
    summary_sensor = ExternalTaskSensor(
        task_id="summary_sensor",
        external_dag_id="kid_news_summary",
        external_task_id="kid_news_modeling",
        execution_date_fn=lambda x: x - timedelta(minutes=60),
        mode='reschedule',
        timeout=3600
    )

    # task for kid keyword
    kid_wordcount = SSHOperator(
        task_id="kid_keyword",
        ssh_conn_id="ssh_spark_yarn",
        command=templated_bash_command_pyspark,
        dag=dag
    )

summary_sensor >> kid_wordcount