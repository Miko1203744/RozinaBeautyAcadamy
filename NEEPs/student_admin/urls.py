from django.urls import path
from .views import *

urlpatterns = [
    path("admin_s", custom_admin_page),
      path("login", indexs),
    path("students", custom_admin_page),
    path("notification", custom_admin_page),
    path("courses", custom_admin_page),
    path("contacts", custom_admin_page),
    path("update_student/<int:student_id>", custom_admin_page),
    path("update_course/<int:course_id>", custom_admin_page),
    path("update_contact/<int:contact_id>", custom_admin_page),
    path("update_price/<int:price_id>", custom_admin_page),
    path("update_student/api/update_student/<int:student_id>",
         update_student.as_view(), name="update_student"),

    path("update_course/api/update_course/<int:course_id>",
         update_course.as_view(), name="update_course"),

    path("update_price/api/update_price/<int:price_id>",
         update_price.as_view(), name="update_price"),

    path("update_contact/api/update_contact/<int:contact_id>",
         update_contact.as_view(), name="update_contact"),
    path("forms", custom_admin_page),
]
