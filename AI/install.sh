#!/bin/bash

# conda
conda create -n env3.9 -y python=3.9
source /opt/homebrew/Caskroom/miniconda/base/etc/profile.d/conda.sh
conda activate env3.9

# kernel
conda install -c conda-forge -y ipykernel
python -m ipykernel install --user --name env3.9 --display-name env3.9

conda install -c conda-forge -y jupyterlab
conda install -c conda-forge -y pandas
conda install -c conda-forge -y nltk
pip install konlpy
conda install -c conda-forge -y jpype1

# Mecab
curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh | bash -s
