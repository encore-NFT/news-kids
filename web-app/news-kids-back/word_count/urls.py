from django.urls import path

from .views import (
    WordCountView,
    PastWordCountView
)

urlpatterns = [
    # 워드카운트
    path('', WordCountView.as_view()),
    path('<str:past_week>', PastWordCountView.as_view()),
]