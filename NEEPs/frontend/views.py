from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import HttpResponse
from django.http import JsonResponse
# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

