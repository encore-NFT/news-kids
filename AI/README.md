# Docker 환경 구성

AI model 학습 및 배포를 위한 docker 환경 구성

## 구조

```
─── pytorch1.7.1-cuda11
    ├── jupyter_notebook_config.py
    ├── notebooks/
    ├── pytorch.DockerFile
    ├── requirements.txt
    └── run_jupyter.sh
```
## Version

```
ubuntu: 18.04
cuda: 11.3.1
torch: 1.7.1
```

## 실행
- image build
```
docker build -t cuda11.3:pytorch1.7.1 -f pytorch.DockerFile .
```
- docker run : gpu 사용
```
docker run -it --name pytorch --gpus '"device=0"' -v $PWD/notebooks:/notebooks -p 8888:8888 -p 6006:6006 cuda11.3:pytorch1.7.1
```
- docker start
```
docker start pytorch -i
```
---

# local M1 conda 환경 구성

## 환경 세팅
- 실행 전제 조건
  - homebrew로 miniconda 설치 상태
  - Open JDK 설치 완료 상태
- [Zulu Open JDK 설치](https://www.azul.com/downloads/?version=java-15-mts&os=macos&architecture=arm-64-bit&package=jdk)
- [miniconda 설치 및 기본 세팅](https://velog.io/@imok-_/M1-Miniconda-설치-및-가상-환경-설정)
- miniconda 외 설치 환경 시 `install.sh` 파일의 `source` 부분 변경 필요

## 실행
```bash
./install.sh
```

## version
python: 3.9.x