from django.db import models
from user.models import User

# 뉴스 테이블
class News(models.Model):
    news_source     = models.CharField(max_length=20)
    news_writer     = models.CharField(max_length=50, blank=True, null=True)
    news_date       = models.DateTimeField()
    news_url        = models.URLField(max_length=500)
    news_title      = models.CharField(max_length=200)
    news_image      = models.URLField(max_length=500, blank=True, null=True)
    news_article    = models.TextField(blank=True, null=True)
    # 참조 필드 (forward-many-to-many manager)
    liked_users     = models.ManyToManyField('user.User', through='Like', related_name='liked_posts')

    class Meta:
        db_table    = 'news'

# 댓글 테이블
class Comments(models.Model):
    user            = models.ForeignKey('user.User', on_delete=models.CASCADE)
    news            = models.ForeignKey('News', on_delete=models.CASCADE)
    content         = models.CharField(max_length=500)
    timestamp       = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table    = 'comments'

# 좋아요 테이블
class Like(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    news = models.ForeignKey('News', on_delete=models.CASCADE)

# 썸내일 테이블
class Thumbnails(models.Model):
    news            = models.ForeignKey('News', on_delete=models.CASCADE)
    thumbnail_url   = models.URLField(max_length=500)

    class Meta:
        db_table    = 'thumbnails'

# 키워드 테이블
class Keyword(models.Model):
    news            = models.ForeignKey('News', on_delete=models.CASCADE)
    keyword         = models.CharField(max_length=50)
    definition      = models.CharField(max_length=200)

    class Meta:
        db_table    = 'keyword'
