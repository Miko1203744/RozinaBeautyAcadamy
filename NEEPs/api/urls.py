from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *
urlpatterns = [
    path('students', StudentCreateAPIView.as_view(), name='student_create'),
    path('student_list', StudentListAPIView.as_view(), name='student_list'),
    path('price', PriceView.as_view(), name='price_list_create'),
    path('courses', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('contact_list', ContactListAPIView.as_view(), name='contact_list'),
    path('courses/day', DayCourseListAPIView.as_view(), name='day-course-list'),
    path('contactMessage', ContactMessageCreateView.as_view(),
         name='contact-message-create'),
    path('delete_student/<int:student_id>',
         delete_student, name="delete_student"),
    path('delete_course/<int:course_id>',
         delete_course, name="delete_course"),
    path('delete_contact/<int:contact_id>',
         delete_contact, name="delete_contact"),
    path('TotalStudent', TotalStudent.as_view(), name='TotalHouse'),
     path('login', custom_login_view, name='login'),
     path('logout', LogoutView.as_view()),
    path('TotalCourse', TotalCourse.as_view(), name='TotalLandlord'),
    path('delete_price/<int:price_id>',
         delete_price, name="delete_price"),
    path('courses/night', NightCourseListAPIView.as_view(),
         name='night-course-list'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('notifications/<int:pk>/', NotificationActionView.as_view(),
         name='notification_action'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
