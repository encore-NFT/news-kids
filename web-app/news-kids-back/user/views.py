import re
import json
import bcrypt
from django.views import View
from django.http import JsonResponse
from django.db.models import Q

from .models import User

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
        if User.objects.filter(Q(email=email) | Q(name=name)).exists():
            return JsonResponse({'message': 'USER_ALREADY_EXISTS'}, status=409)

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
        email    = data.get('email', None)
        name     = data.get('name', None)
        phone    = data.get('phone', None)
        password = data.get('password', None)
        
        # 프론트에서 1차 공백 체크
        if not (password and (email or name or phone)):
            return JsonResponse({'message': 'KEY_ERROR'}, status=400)        
            
        # 사용자 유무 검증
        if User.objects.filter(Q(email=email) | Q(name=name) | Q(phone=phone)).exists():
            user = User.objects.get(Q(email=email) | Q(name=name) | Q(phone=phone))

            # 비밀번호 검증
            if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                
                # JSON Web Token: 인가를 위해 JWT 발행, respone 전달
                token = jwt.encode({'user_id': user.id}, SECRET['secret'], algorithm='HS256')
                return JsonResponse({'message': 'SUCCESS', 'access_token': token}, status=200) 
            
            return JsonResponse({'message': 'INVALID_PASSWORD'}, status=401)
        
        return JsonResponse({'message': 'INVALID_USER'}, status=401)