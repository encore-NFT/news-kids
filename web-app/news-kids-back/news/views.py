import json
from json.decoder import JSONDecodeError

from django.views import View
from django.http  import JsonResponse

from .models      import News, Comments, Thumbnails, Keyword
from user.models  import User
from user.utils   import login_decorator

# 뉴스 Read
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
                'keyword'      : Keyword.objects.get(news=news.id).keyword,
                'definition'   : Keyword.objects.get(news=news.id).definition,
                'thumbnails'   : [t.thumbnail_url for t in Thumbnails.objects.filter(news=news.id)],
                'comments'     : [{
                    'user': c.user.user_name, 
                    'content': c.content, 
                    'timestamp': c.timestamp
                    } for c in Comments.objects.filter(news=news.id)
                ],
                'liked_users'  : news.liked_users.count(), 
            } for news in News.objects.all()
        ]
        return JsonResponse({'data': news_list}, status=200)

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
            return JsonResponse({'message': 'INVALID_POST'}, status=400)

        # 댓글 DB 저장
        Comments.objects.create(
            user      = user,
            news      = News.objects.get(id=news_id),
            content   = content
        )
        return JsonResponse({'message': 'SUCCESS'}, status=200)

# 댓글 Update / Delete
class CommentsDetailView(View):
    # 뎃글 Update
    @login_decorator    # login 검증
    def post(self, request, comments_id):
        try:
            data    = json.loads(request.body)
            content = data.get('content', None)

            # 폼 KEY_ERROR 검증
            if not content:
                return JsonResponse({'message': 'KEY_ERROR'}, status=400)
            
            # 수정할 comments 가져오기
            comments = Comments.objects.get(id=comments_id)
            
            # 유저 검증
            if comments.user != request.user:
                return JsonResponse({'message': 'INVALID_USER'}, status=401)

            # 대상 comments 수정 후 저장
            comments.content = content 
            comments.save()
            return JsonResponse({'message': 'SUCCESS'}, status=200)

        # JSON 에러 처리
        except JSONDecodeError:
            return JsonResponse({'message': 'REQUEST_BOBY_DOES_NOT_EXISTS'}, status=400)

    # 댓글 Delete
    @login_decorator    # login 검증
    def delete(self, request, comments_id):
        # 대상 comments 유효 검증
        if not Comments.objects.filter(id=comments_id).exists():
            return JsonResponse({'message': 'INVALID_COMMENT'}, status=400)
        
        # 삭제할 comments 가져오기
        comments = Comments.objects.get(id=comments_id)
        
        # 유저 검증
        if comments.user != request.user:
            return JsonResponse({'message': 'INVALID_USER'}, status=401)

        # 대상 comments 삭제
        comments.delete()
        return JsonResponse({'message': 'SUCCESS'}, status=200)

# 좋아요 Create
class LikeView(View):
    # 좋아요 기능
    # @login_decorator    # login 검증
    def post(self, request):
        data    = json.loads(request.body)
        user    = request.user
        news_id = data.get('news', None)    # 프론트에서 news.id 받아옴

        # news_id 폼 검증
        if not news_id:
            return JsonResponse({'message': 'KEY_ERROR'}, status=400)

        # news_id 유효 검증
        if not News.objects.filter(id=news_id).exists():
            return JsonResponse({'message': 'INVALID_POST'}, status=400)

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
