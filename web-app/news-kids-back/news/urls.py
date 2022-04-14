from django.urls import path

from .views import (
    NewsView, 
    CommentsView, 
    CommentsDetailView,
)

urlpatterns = [
    path('', NewsView.as_view()),
    path('/comments', CommentsView.as_view()),
    path('/comments/<int:comment_id>', CommentsDetailView.as_view()),
]