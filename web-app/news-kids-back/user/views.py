import re
import jwt
import bcrypt

import json
from json.decoder import JSONDecodeError

from django.views import View
from django.db.models import Q
from django.http import JsonResponse

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

# get json
def get_json(arr):
    if arr:
        return arr[0]
    return arr

# time parsing
def time_str(timestamp):
    timestamp = timestamp.strftime("%Y.%m.%d. %H:%M:%S")
    return timestamp

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
        comment_record = Comments.objects.filter(user_id=user_id)
        like_record = Like.objects.filter(user_id=user_id)

        profile = {
            'user_name': request.user.user_name,
            'user_nickname': request.user.user_nickname,
            'user_email': request.user.user_email,
            'user_introduce': request.user.user_introduce,
        }
        record = {
            'like': [
                get_json(list(News.objects.filter(id=l.news_id)
                    .values('id', 'news_title', 'news_image')))
                for l in like_record
            ],
            'comment': [{
                'id': c.id,
                'content' : c.content,
                'timestamp': time_str(c.timestamp),
                'news': get_json(list(News.objects.filter(id=c.news_id)
                            .values('id', 'news_title', 'news_image')))
                } for c in comment_record
            ],
        }

        data = {'profile': profile, 'record': record}
        return JsonResponse({'data': data}, status=200)

# 프로필 user 파라미터
class ProfileDetailView(View):
    def get(self, request, user_name):
        user = User.objects.get(user_name=user_name)
        user_id = user.id
        comment_record = Comments.objects.filter(user_id=user_id)
        like_record = Like.objects.filter(user_id=user_id)

        profile = {
            'user_name': user.user_name,
            'user_nickname': user.user_nickname,
            'user_email': user.user_email,
            'user_introduce': user.user_introduce,
        }
        record = {
            'like': [
                get_json(list(News.objects.filter(id=l.news_id)
                    .values('id', 'news_title', 'news_image')))
                for l in like_record
            ],
            'comment': [{
                'id': c.id,
                'content' : c.content,
                'timestamp': time_str(c.timestamp),
                'news': get_json(list(News.objects.filter(id=c.news_id)
                            .values('id', 'news_title', 'news_image')))
                } for c in comment_record
            ],
        }

        data = {'profile': profile, 'record': record}
        return JsonResponse({'data': data}, status=200)

# 프로필 edit
class ProfileEditView(View):
    @login_decorator
    def get(self, request):
        profile = {
            'user_name': request.user.user_name,
            'user_nickname': request.user.user_nickname,
            'user_email': request.user.user_email,
            'user_introduce': request.user.user_introduce,
        }

        return JsonResponse({'data': profile}, status=200)

    @login_decorator
    def post(self, request):
        try:
            data = json.loads(request.body)
            user_name = data.get('user_name', None)
            user_nickname = data.get('user_nickname', None)
            user_email = data.get('user_email', None)
            user_introduce = data.get('user_introduce', None)

            # 폼 KEY_ERROR 검증
            if not (user_email and user_name):
                return JsonResponse({'message': 'KEY_ERROR'}, status=400)

            # 이메일/비밀번호 검증
            if not validate_email(user_email):
                return JsonResponse({'message': 'EMAIL_VALIDATION_ERROR'}, status=422)

            # unique 값 검증
            if request.user.user_name != user_name:
                if User.objects.filter(user_name=user_name).exists():
                    return JsonResponse({'message': '사용자 아이디가 존재합니다.'}, status=409)
            if request.user.user_email != user_email:
                if User.objects.filter(user_email=user_email).exists():
                    return JsonResponse({'message': '사용자 이메일이 존재합니다.'}, status=409)

            # 대상 유저 수정 후 저장
            user = User.objects.get(id=request.user.id)
            user.user_name = user_name
            user.user_nickname = user_nickname
            user.user_email = user_email
            user.user_introduce = user_introduce
            user.save()

            profile = {
                'user_name': user.user_name,
                'user_nickname': user.user_nickname,
                'user_email': user.user_email,
                'user_introduce': user.user_introduce,
            }

            return JsonResponse({'data': profile}, status=200)

        # JSON 에러 처리
        except JSONDecodeError:
            return JsonResponse({'message': 'REQUEST_BOBY_DOES_NOT_EXISTS'}, status=400)

    @login_decorator
    def delete(self, request):
        try:
            data = json.loads(request.body)
            user_password = data.get('user_password', None)

            # 폼 KEY_ERROR 검증
            if not (user_password):
                return JsonResponse({'message': 'KEY_ERROR'}, status=400)        

            # 비밀번호 검증
            if bcrypt.checkpw(user_password.encode('utf-8'), request.user.user_password.encode('utf-8')):
                user = User.objects.get(id=request.user.id)
                user.delete()
                return JsonResponse({'data': 'SUCCESS'}, status=200)

            return JsonResponse({'message': '비밀번호를 잘못 입력했습니다.'}, status=401)

        except JSONDecodeError:
            return JsonResponse({'message': 'REQUEST_BOBY_DOES_NOT_EXISTS'}, status=400)