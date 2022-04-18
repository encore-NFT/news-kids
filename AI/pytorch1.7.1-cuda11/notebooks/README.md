
# kid news Summarization


## Project 구조

```
├── KorBertSum
│   ├── bert_config_uncased_base.json
│   ├── bert_data
│   │   ├── korean.test.0.bert.pt
│   │   ├── korean.train.0.bert.pt
│   │   └── korean.valid.0.bert.pt
│   ├── json_data
│   │   ├── korean.test.0.json
│   │   ├── korean.train.0.json
│   │   └── korean.valid.0.json
│   ├── logs
│   ├── models
│   │   └── bert_classifier
│   ├── results
│   │   ├── korean_step10000.candidate
│   │   └── korean_step10000.gold
│   └── src
│       ├── distributed.py
│       ├── models
│       ├── others
│       ├── prepro
│       ├── preprocess.py
│       └── train.py
├── korBertTest.ipynb
├── model
└── test_result.csv
```

---

1. test_result.csv :

| media  |    id    | article_original |   article_morp    | abstractive | extractive |
|:----:|:------:|:--------------:|:---------------:|:---------:|:--------:|
| 신문사 | 기사번호 |     기사원문     | 형태소분석된 기사 |  생성요약   |  추출요약  |

2. bert_data : json_data to pt
   - `korean.test.0.bert.pt`, `korean.train.0.bert.pt`, `korean.valid.0.bert.pt`
3. json_data :  `test_result.csv` file to json
   - `korean.test.0.json`, `korean.train.0.json`, `korean.valid.0.json`
4. models : train result
   - `model_step_10000.pt` 
5. results : test result
   - `korean_step10000.candidate` : label data
   - `korean_step10000.gold` : test data
6. model : Pre-trained BERT model

