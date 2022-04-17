from django.urls import path

from .views import (
    SignupView,
    LoginView,
)

urlpatterns = [
    # 회원가입
    path('signup', SignupView.as_view()),
    # 로그인
    path('login', LoginView.as_view()),
]