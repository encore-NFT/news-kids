import jwt
import json

from django.http import JsonResponse

from .models     import User
from config import SECRET_KEY, ALGORITHMS

def login_decorator(func):
    # API function 인자 / 중첩 함수 wrapper 값 반환
    def wrapper(self, request, *args, **kwargs):
        
        # login check
        # JWT가 없다면
        if "Authorization" not in request.headers:
            return JsonResponse({"message": "로그인 후 이용 가능합니다."}, status=401)
        
        # JWT 정상 포함
        try:
            access_token = request.headers['Authorization']
            payload      = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHMS)
            login_user   = User.objects.get(id=payload['user_id'])
            request.user = login_user
            return func(self, request, *args, **kwargs)
        
        # JWT 예외처리
        except jwt.DecodeError:
            return JsonResponse({'message': '로그인 후 이용 가능합니다.'}, status=401)
        # User 예외처리
        except User.DoesNotExist:
            return JsonResponse({'message': 'INVALID_USER'}, status=401)
    
    return wrapper


def user_decorator(func):
    # API function 인자 / 중첩 함수 wrapper 값 반환
    def wrapper(self, request, *args, **kwargs):
        request.user = False
        
        # login check
        if "Authorization" in request.headers:
            # JWT 정상 포함
            try:
                access_token = request.headers['Authorization']
                payload      = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHMS)
                login_user   = User.objects.get(id=payload['user_id'])
                request.user_id = login_user.id
                request.user = True
                return func(self, request, *args, **kwargs)
            # JWT 예외처리
            except jwt.DecodeError:
                return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
            # User 예외처리
            except User.DoesNotExist:
                return JsonResponse({'message': 'INVALID_USER'}, status=401)
        return func(self, request, *args, **kwargs)
    return wrapper