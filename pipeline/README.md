## Settings in EC2

### Script to put when starting EC2
```bash
#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive
export HOME=/root

# System dependencies
apt-get update && apt-get install -y make nano

# Install Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Enable standard user (ubuntu) to manage containers (required for Remote Containers)
groupadd docker
usermod -aG docker ubuntu
newgrp docker
```
### Network
```bash
# Create Docker Network for connection
docker network create airflownet
```

### Airflow
```bash
# Meta-database for Airflow
docker container run \
-p 5432:5432 \
--network airflownet \
--name postgres-airflow \
-e POSTGRES_PASSWORD=admin \
-e POSTGRES_USER=admin \
-e POSTGRES_DB=airflow_db \
-d \
-v psql_data:/var/lib/postgresql/data \
postgres:13

# Airflow (check the directory for bind-mount)
docker container run \
-it \
-p 8090:8080 \
--network airflownet \
-v $(pwd):/home/airflow/airflow/dags \
-e LC_ALL=C.UTF-8 \
--name airflow carl020958/ubuntu-airflow:18.04-2.1.4-psql-amd64

# initialize db
su - airflow
cd airflow
source ./.venv/bin/activate
airflow db init

# make user
airflow users create -u admin -p admin -f jisu -l park -r Admin -e carl020958@korea.ac.kr

# Add Variable & Connection for the dag
```

### Web-Crawler
* Needs .credential.json in directory "/home/scrapy/scrapy/kidnewscrawling/kidnewscrawling"

```bash
# check the directory for bind-mount
docker container run \
-it \
-d \
--network airflownet \
-e LC_ALL=C.UTF-8 \
--name scrapy \
-v $(pwd):/home/scrapy/scrapy/kidnewscrawling \
carl020958/ubuntu-python-ssh-scrapy:18.04-3.8.10-amd64
```

### Hadoop-Spark Cluster
* Needs .credential.json in directory "/opt/workspace/src"

```bash
# check the directory for bind-mount(spark)
docker-compose up
```



