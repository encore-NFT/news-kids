from django.contrib import admin
from .models import (Keyword, News, Comments, Like, Thumbnails)
# Register your models here.

admin.site.register(News)
admin.site.register(Comments)
admin.site.register(Like)
admin.site.register(Thumbnails)
admin.site.register(Keyword)