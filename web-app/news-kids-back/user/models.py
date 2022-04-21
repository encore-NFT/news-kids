from django.db import models

class User(models.Model):
    # user_id = models.IntegerField(primary_key=True)
    user_name = models.CharField(max_length=20)
    user_nickname = models.CharField(unique=True, max_length=20)
    user_email = models.EmailField(unique=True, max_length=50)
    user_password = models.CharField(max_length=300)
    user_introduce = models.CharField(max_length=300, default='')
    subscription_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user'