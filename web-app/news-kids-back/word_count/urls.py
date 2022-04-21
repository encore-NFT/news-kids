from django.urls import path

from .views import (
    WordCountView,
    PastWordCountView,
    WordCountDetailView,
)

urlpatterns = [
    # 워드카운트
    path('', WordCountView.as_view()),
    path('week/<str:past_week>', PastWordCountView.as_view()),
    path('search', WordCountDetailView.as_view()),
]