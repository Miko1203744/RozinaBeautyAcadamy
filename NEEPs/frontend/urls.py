from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', index, name="landpage"),
    path('about', index, name="about"),
    path('course', index, name="course"),
    path('price', index, name="price"),
    path('contact', index, name="contact"),
    path('makeup', index, name="makeup"),
    path('nails', index, name="nails"),
    path('eyelash', index, name="eyelash"),
    path('hina', index, name="hina"),
    path('register/<int:course_id>', index, name="register"),
    path('hina_service', index, name="hina_service"),
    path('makeup_service', index, name="makeup_service"),
    path('nails_service', index, name="nails_service"),
    path('eyelash_service', index, name="eyelash_service"),
    path('studentcreate', index, name="studentcreate"),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
