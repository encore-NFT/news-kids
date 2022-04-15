from django.shortcuts import render

import json
import datetime

from django.views import View
from django.http  import JsonResponse
from django.db.models import Sum, Q

from .models      import WordCount

# 뉴스 Read
class WordCountView(View):
    def get(self, request):
        dt = datetime.datetime.now()
        THIS_YEAR = dt.strftime('%Y')
        THIS_WEEK = dt.strftime('%W')

        if not WordCount.objects.filter(Q(date__year=THIS_YEAR) & Q(date__week=THIS_WEEK)).exists():
            if THIS_WEEK == '0':
                THIS_YEAR = str(int(THIS_YEAR)-1)
                THIS_WEEK = '52'
            THIS_WEEK = str(int(THIS_WEEK)-1)

        count_list = list(
                    WordCount.objects.values('word')
                        .annotate(Sum('count'))
                        .filter(Q(date__year=THIS_YEAR) & Q(date__week=THIS_WEEK))
                    )

        return JsonResponse({'data': count_list}, status=200)

class PastWordCountView(View):
    def get(self, request, past_week):
        PAST_YEAR, PAST_WEEK = past_week.split('-W')

        count_list = list(
                    WordCount.objects.values('word')
                        .annotate(Sum('count'))
                        .filter(Q(date__year=PAST_YEAR) & Q(date__week=PAST_WEEK))
                    )

        return JsonResponse({'data': count_list}, status=200)
