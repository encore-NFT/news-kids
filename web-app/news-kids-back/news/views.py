import json
from json.decoder import JSONDecodeError
from datetime import datetime

from django.views import View
from django.db.models import Q
from django.http  import JsonResponse

from .models      import Like, News, Comments, Thumbnails, Keyword
from user.models  import User
from user.utils   import login_decorator, user_decorator

# get json
def get_json(arr):
    if arr:
        return arr[0]
    return arr

# time parsing
def time_str(timestamp):
    timestamp = timestamp.strftime("%Y.%m.%d. %H:%M:%S")
    return timestamp

# 뉴스 Read
class NewsView(View):
    @user_decorator
    def get(self, request):
        news_list = [{
                'news_id'      : news.id,
                'news_source'  : news.news_source,
                'news_date'    : time_str(news.news_date),
                'news_url'     : news.news_url,
                'news_title'   : news.news_title,
                'news_image'   : news.news_image,
                'news_article' : news.news_article,
                'keyword'      : get_json(list(Keyword.objects.filter(news=news.id).values('keyword', 'definition'))),
                'thumbnails'   : [t.thumbnail_url for t in Thumbnails.objects.filter(news=news.id)],
                'youtubes'     : [t.youtube_url for t in Thumbnails.objects.filter(news=news.id)],
                'comments'     : [{
                    'comments_id': c.id,
                    'user': c.user.user_name, 
                    'content': c.content, 
                    'timestamp': time_str(c.timestamp)
                    } for c in Comments.objects.filter(news=news.id)
                ],
                'like_count'   : news.liked_users.count(),
                'like_status'  : Like.objects.filter(Q(news_id=news.id) & Q(user_id=request.user_id)).exists()\
                                    if request.user else False
            } for news in News.objects.all().order_by('-news_date')
        ]
        return JsonResponse({'data': news_list}, status=200)

# 뉴스 검색
class NewsSearchView(View):
    def post(self, request):
        data = json.loads(request.body)
        word = data.get('word', None)
        filtered_news = News.objects\
                        .filter(Q(news_title__contains=word) | Q(news_article__contains=word))\
                        .order_by('-news_date')
        news_list = [{
                'news_id'      : news.id,
                'news_source'  : news.news_source,
                'news_date'    : time_str(news.news_date).split(" ")[0],
                'news_title'   : news.news_title,
                'news_image'   : news.news_image,
                'news_article' : news.news_article,
                'comments'     : Comments.objects.filter(news=news.id).count(),
                'like_count'   : news.liked_users.count(),
            } for news in filtered_news
        ]
        return JsonResponse({'data': news_list}, status=200)

# 뉴스 Read One
class NewsDetailView(View):
    @user_decorator
    def get(self, request, news_id):
        news = News.objects.get(id=news_id)
        news_dict = {
                'news_id'      : news.id,
                'news_source'  : news.news_source,
                'news_date'    : time_str(news.news_date),
                'news_url'     : news.news_url,
                'news_title'   : news.news_title,
                'news_image'   : news.news_image,
                'news_article' : news.news_article,
                'keyword'      : get_json(list(Keyword.objects.filter(news=news_id).values('keyword', 'definition'))),
                'thumbnails'   : [t.thumbnail_url for t in Thumbnails.objects.filter(news=news_id)],
                'youtubes'     : [t.youtube_url for t in Thumbnails.objects.filter(news=news.id)],
                'comments'     : [{
                    'comments_id': c.id,
                    'user': c.user.user_name, 
                    'content': c.content, 
                    'timestamp': time_str(c.timestamp)
                    } for c in Comments.objects.filter(news=news_id)
                ],
                'like_count'   : news.liked_users.count(),
                'like_status'  : Like.objects.filter(Q(news_id=news.id) & Q(user_id=request.user_id)).exists()\
                                    if request.user else False
            }
        return JsonResponse({'data': news_dict}, status=200)

# 댓글 Create
class CommentsView(View):
    # 댓글 Create
    @login_decorator    # login 검증
    def post(self, request):
        data      = json.loads(request.body)
        user      = request.user
        news_id   = data.get('news', None)
        content   = data.get('content', None)
        
        # 폼 KEY_ERROR 검증
        if not (news_id and content):
            return JsonResponse({'message': 'KEY_ERROR'}, status=400)
        
        # news_id 유효 검증
        if not News.objects.filter(id=news_id).exists():
            return JsonResponse({'message': 'INVALID_NEWS'}, status=400)

        # 댓글 DB 저장
        comment = Comments.objects.create(
            user      = user,
            news      = News.objects.get(id=news_id),
            content   = content
        )
        return JsonResponse({'data': {
            'comments_id': comment.id,
            'user': user.user_name, 
            'content': comment.content, 
            'timestamp': time_str(comment.timestamp)
        }}, status=200)

# 댓글 Update / Delete
class CommentsDetailView(View):
    # 댓글 Update
    @login_decorator    # login 검증
    def post(self, request, comment_id):
        try:
            data    = json.loads(request.body)
            content = data.get('content', None)

            # 폼 KEY_ERROR 검증
            if not content:
                return JsonResponse({'message': 'KEY_ERROR'}, status=400)
            
            # 수정할 comments 가져오기
            comments = Comments.objects.get(id=comment_id)
            
            # 유저 검증
            if comments.user != request.user:
                return JsonResponse({'message': 'INVALID_USER'}, status=401)

            # 대상 comments 수정 후 저장
            comments.content = content 
            comments.save()
            return JsonResponse({'data': content}, status=200)

        # JSON 에러 처리
        except JSONDecodeError:
            return JsonResponse({'message': 'REQUEST_BOBY_DOES_NOT_EXISTS'}, status=400)

    # 댓글 Delete
    @login_decorator    # login 검증
    def delete(self, request, comment_id):
        # 대상 comments 유효 검증
        if not Comments.objects.filter(id=comment_id).exists():
            return JsonResponse({'message': 'INVALID_COMMENT'}, status=400)
        
        # 삭제할 comments 가져오기
        comments = Comments.objects.get(id=comment_id)
        
        # 유저 검증
        if comments.user != request.user:
            return JsonResponse({'message': '사용자 계정의 댓글이 아니므로 삭제할 수 없습니다.'}, status=401)

        # 대상 comments 삭제
        comments.delete()
        return JsonResponse({'message': 'SUCCESS'}, status=200)

# 좋아요 Create
class LikeView(View):
    # 좋아요 기능
    @login_decorator    # login 검증
    def post(self, request):
        data    = json.loads(request.body)
        news_id = data.get('news_id', None)    # 프론트에서 news.id 받아옴
        user    = request.user

        # news_id 폼 검증
        if not news_id:
            return JsonResponse({'message': 'KEY_ERROR'}, status=400)

        # news_id 유효 검증
        if not News.objects.filter(id=news_id).exists():
            return JsonResponse({'message': 'INVALID_NEWS'}, status=400)

        # id 대상 뉴스 로드
        news = News.objects.get(id=news_id)

        if news.liked_users.filter(id=user.id).exists():
            news.liked_users.remove(user)
            message = 'Cancle'
        else:
            news.liked_users.add(user)
            message = 'Like'

        like_count = news.liked_users.count()

        return JsonResponse({'message': message, 'like_count': like_count}, status=200)
