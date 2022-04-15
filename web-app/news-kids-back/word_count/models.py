from django.db import models

# 워드카운트 테이블
class WordCount(models.Model):
    date        = models.DateField('Date')
    word        = models.CharField(max_length=100)
    count       = models.IntegerField()

    class Meta:
        db_table = 'word_count'