import json
from json.decoder import JSONDecodeError

from django.views import View
from django.http  import JsonResponse

from .models      import News, Comments
from user.models  import User
from user.utils   import login_decorator

class NewsView(View):
    def get(self, request):
        news_list = [{
                'news_id'      : news.id,
                'news_source'  : news.news_source,
                'news_writer'  : news.news_writer,
                'news_date'    : news.news_date,
                'news_url'     : news.news_url,
                'news_title'   : news.news_title,
                'news_image'   : news.news_image,
                'news_article' : news.news_article,
                # 'comments'     : [{
                #     'user': c.user.user_name, 
                #     'content': c.content, 
                #     'timestamp': c.timestamp
                #     } for c in Comments.objects.filter(news=news.id)
                # ],
            } for news in News.objects.all()
        ]
        return JsonResponse({'data': news_list}, status=200)


# class CommentView(View):
#     @login_decorator
#     def post(self, request):
#         data      = json.loads(request.body)
#         user      = request.user
#         post_id   = data.get('post', None)
#         content   = data.get('content', None)
        
#         # KEY_ERROR check
#         if not (post_id and content):
#             return JsonResponse({'message': 'KEY_ERROR'}, status=400)
        
#         # valid post check
#         if not Post.objects.filter(id=post_id).exists():
#             return JsonResponse({'message': 'INVALID_POST'}, status=400)

#         Comment.objects.create(
#             user      = user,
#             post      = Post.objects.get(id=post_id),
#             content   = content
#         )
#         return JsonResponse({'message': 'SUCCESS'}, status=200)
        

# class CommentDetailView(View):
#     # update
#     @login_decorator
#     def post(self, request, comment_id):
#         try:
#             data    = json.loads(request.body)
#             content = data.get('content', None)

#             # KEY_ERROR check
#             if not content:
#                 return JsonResponse({'message': 'KEY_ERROR'}, status=400)
            
#             comment = Comment.objects.get(id=comment_id)
            
#             # valid user check
#             if comment.user != request.user:
#                 return JsonResponse({'message': 'INVALID_USER'}, status=401)

#             comment.content = content 
#             comment.save()
#             return JsonResponse({'message': 'SUCCESS'}, status=200)

#         except JSONDecodeError:
#             return JsonResponse({'message': 'REQUEST_BOBY_DOES_NOT_EXISTS'}, status=400)

#     @login_decorator
#     def delete(self, request, comment_id):
#         # vaild comment check
#         if not Comment.objects.filter(id=comment_id).exists():
#             return JsonResponse({'message': 'INVALID_COMMENT'}, status=400)
        
#         comment = Comment.objects.get(id=comment_id)
        
#         # valid user check
#         if comment.user != request.user:
#             return JsonResponse({'message': 'INVALID_USER'}, status=401)

#         comment.delete()
#         return JsonResponse({'message': 'SUCCESS'}, status=200)