from django.db import models
from user.models import User

# 뉴스 관련 테이블
class News(models.Model):
    # news_id = models.IntegerField(primary_key=True)
    news_source     = models.CharField(max_length=20)
    news_writer     = models.CharField(max_length=50, blank=True, null=True)
    news_date       = models.DateTimeField()
    news_url        = models.URLField(max_length=500)
    news_title      = models.CharField(max_length=200)
    news_image      = models.URLField(max_length=500, blank=True, null=True)
    news_article    = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'news'

# 댓글 관련 테이블
class Comments(models.Model):
    user        = models.ForeignKey('user.User', on_delete=models.CASCADE)
    news        = models.ForeignKey('News', on_delete=models.CASCADE)
    content     = models.CharField(max_length=500)
    timestamp   = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'comments'