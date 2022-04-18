ARG UBUNTU_VERSION=18.04
ARG CUDA_VERSION=11.3.1
ARG CUDA=11.3
ARG CUDNN_VERSION=8
ARG PYTHON_VERSION=3.6

# 11.3.1-cudnn8-devel-ubuntu18.04
FROM nvidia/cuda:${CUDA_VERSION}-cudnn${CUDNN_VERSION}-devel-ubuntu${UBUNTU_VERSION}

ARG CONDA_ENV_NAME=torch
ARG PYTHON=python3
ARG PIP=pip3

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    libxml-parser-perl \
    git \
    curl \
    vim \
    ssh \
    sudo \
    unzip \
    ca-certificates \
    libjpeg-dev \
    libpng-dev \
    wget

# For CUDA profiling
ENV LD_LIBRARY_PATH /usr/local/cuda-${CUDA}/targets/x86_64-linux/lib:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64:$LD_LIBRARY_PATH
RUN ln -s /usr/local/cuda/lib64/stubs/libcuda.so /usr/local/cuda/lib64/stubs/libcuda.so.1 && \
    echo "/usr/local/cuda/lib64/stubs" > /etc/ld.so.conf.d/z-cuda-stubs.conf && \
    ldconfig

RUN ${PIP} --no-cache-dir install -q --upgrade pip setuptools wheel

# Install pytorch
RUN ${PIP} --no-cache-dir install -q --upgrade \
      torch==1.7.1+cu110 torchvision==0.8.2+cu110 torchaudio===0.7.2 -f https://download.pytorch.org/whl/torch_stable.html

COPY requirements.txt /tmp
WORKDIR /tmp

RUN ${PIP} install -r /tmp/requirements.txt

ENV LANG C.UTF-8

WORKDIR /notebooks

# Set up our notebook config.
COPY jupyter_notebook_config.py /root/.jupyter/

COPY run_jupyter.sh /

# IPython
EXPOSE 8888

# Tensorboard
EXPOSE 6006

CMD ["/run_jupyter.sh", "--allow-root"]