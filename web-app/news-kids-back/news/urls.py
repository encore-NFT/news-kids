from django.urls import path

from .views import (
    NewsView, 
    CommentsView, 
    CommentsDetailView,
    LikeView,
)

urlpatterns = [
    path('', NewsView.as_view()),
    path('comments', CommentsView.as_view()),
    path('comments/<int:comments_id>', CommentsDetailView.as_view()),
    path('like', LikeView.as_view()),
]