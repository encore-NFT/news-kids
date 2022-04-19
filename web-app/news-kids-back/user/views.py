import re
import jwt
import json
import bcrypt
from django.views import View
from django.http import JsonResponse
from django.db.models import Q

from .models import User
from news.models import Comments, News, Like
from .utils   import login_decorator
from config import SECRET_KEY, ALGORITHMS

MINIMUM_PASSWORD_LENGTH = 8

# 이메일 검증(__@__.__)
def validate_email(email):
    pattern = re.compile('^.+@+.+\.+.+$')
    if not pattern.match(email):
        return False
    return True

# 비밀번호 검증
def validate_password(password):
    if len(password) < MINIMUM_PASSWORD_LENGTH:
        return False
    return True

# 회원가입
class SignupView(View):
    # post request
    def post(self, request):
        data     = json.loads(request.body)
        name     = data.get('name', None)       # name = 유저 id 임
        nickname = data.get('nickname', None)
        email    = data.get('email', None)
        password = data.get('password', None)

        # 프론트에서 1차 공백 체크
        if not(password and email and name):
            return JsonResponse({'message': 'KEY_ERROR'}, status=400)

        # 이메일/비밀번호 검증
        if not validate_email(email):
            return JsonResponse({'message': 'EMAIL_VALIDATION_ERROR'}, status=422)

        if not validate_password(password):
            return JsonResponse({'message': 'PASSWORD_VALIDATION_ERROR'}, status=422)
        
        # unique 값 검증
        if User.objects.filter(Q(user_email=email) | Q(user_name=name)).exists():
            return JsonResponse({'message': '사용자 아이디 또는 이메일이 존재합니다.'}, status=409)

        # 회원 생성
        User.objects.create(
            user_name       = name,
            user_nickname   = nickname,
            user_email      = email,
            user_password   = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        )
        return JsonResponse({'message': 'SUCCESS'}, status=200)

# 로그인
class LoginView(View):
    # post request
    def post(self, request):
        data     = json.loads(request.body)
        id       = data.get('id', None)
        password = data.get('password', None)

        if validate_email(id):
            email, name = id, None
        else:
            email, name = None, id
        
        # 프론트에서 1차 공백 체크
        if not (password and (email or name)):
            return JsonResponse({'message': 'KEY_ERROR'}, status=400)        
            
        # 사용자 유무 검증
        if User.objects.filter(Q(user_email=email) | Q(user_name=name)).exists():
            user = User.objects.get(Q(user_email=email) | Q(user_name=name))

            # 비밀번호 검증
            if bcrypt.checkpw(password.encode('utf-8'), user.user_password.encode('utf-8')):
                
                # JSON Web Token: 인가를 위해 JWT 발행, respone 전달
                token = jwt.encode({'user_id': user.id}, SECRET_KEY, algorithm=ALGORITHMS)
                return JsonResponse({'message': 'SUCCESS', 'access_token': token}, status=200) 
            
            return JsonResponse({'message': '아이디 또는 비밀번호를 잘못 입력했습니다.'}, status=401)

        return JsonResponse({'message': '아이디 또는 비밀번호를 잘못 입력했습니다.'}, status=401)

# 프로필
class ProfileView(View):
    @login_decorator
    def get(self, request):
        user_id = request.user.id
        user = User.objects.get(id=user_id)
        comment_record = Comments.objects.filter(user_id=user_id)
        like_record = Like.objects.filter(user_id=user_id)

        profile = {
            'user_name': user.user_name,
            'user_nickname': user.user_nickname,
            'user_email': user.user_email,
        }
        record = {
            'like': [
                list(News.objects.filter(id=l.news_id)
                    .values('id', 'news_title', 'news_image'))
                for l in like_record
            ],
            'comment': [{
                'content' : c.content,
                'timestamp': c.timestamp,
                'news': list(News.objects.filter(id=c.news_id)
                            .values('id', 'news_title', 'news_image'))
                }for c in comment_record
            ],
        }

        data = {'profile': profile, 'record': record}
        return JsonResponse({'data': data}, status=200)
