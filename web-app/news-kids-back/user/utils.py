import jwt
import json

from django.http import JsonResponse

from .models     import User
from config import SECRET_KEY, ALGORITHMS

def login_decorator(func):
    # API function 인자 / 중첩 함수 wrapper 값 반환
    def wrapper(self, request, *args, **kwargs):
        
        # login check
        if "Authorization" not in request.headers:
            return JsonResponse({"message": "NEED_LOGIN"}, status=401)
        
        try:
            access_token = request.headers['Authorization']
            payload      = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHMS)
            login_user   = User.objects.get(id=payload['user_id'])
            request.user = login_user
            return func(self, request, *args, **kwargs)
        
        except jwt.DecodeError:
            return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
        
        except User.DoesNotExist:
            return JsonResponse({'message': 'INVALID_USER'}, status=401)
    
    return wrapper