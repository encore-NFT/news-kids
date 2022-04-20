from django.urls import path

from .views import (
    LoginView,
    SignupView,
    ProfileView,
    ProfileEditView,
    ProfileDetailView,
)

urlpatterns = [
    # 로그인
    path('login', LoginView.as_view()),
    # 회원가입
    path('signup', SignupView.as_view()),
    # 프로필
    path('profile', ProfileView.as_view()),
    path('profile/<str:user_name>', ProfileDetailView.as_view()),
    # 회원 정보 수정
    path('edit', ProfileEditView.as_view()),
]