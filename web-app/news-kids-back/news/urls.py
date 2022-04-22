from django.urls import path

from .views import (
    NewsView, 
    NewsDetailView,
    NewsSearchView,
    CommentsView, 
    CommentsDetailView,
    LikeView,
)

urlpatterns = [
    path('', NewsView.as_view()),
    path('<int:news_id>', NewsDetailView.as_view()),    # localhost:8000/api/news/1
    path('search', NewsSearchView.as_view()),
    path('comments', CommentsView.as_view()),
    path('comments/<int:comment_id>', CommentsDetailView.as_view()),
    path('like', LikeView.as_view()),
]