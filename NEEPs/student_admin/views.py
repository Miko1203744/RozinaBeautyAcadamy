from django.shortcuts import render
from frontend.models import *
from api.serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.decorators import login_required
# Create your views here.


def indexs(request, *args, **kwargs):
    return render(request, 'frontend/indexs.html')


@login_required
def custom_admin_page(request, *args, **kwargs):
    return render(request, 'frontend/custom_admin.html')

class update_student(APIView):
    def put(self, request, student_id):
        # Assuming you're passing `student_id` in the URL
        try:
            student = Student.objects.get(id=student_id)
            serializer = StudentSerializer(
                student, data=request.data, partial=True)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)


class update_course(APIView):
    def put(self, request, course_id):
        # Assuming you're passing `student_id` in the URL
        try:
            course = Course.objects.get(id=course_id)
            serializer = CourseSerializer(
                course, data=request.data, partial=True)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)


class update_price(APIView):
    def put(self, request, price_id):
        # Assuming you're passing `student_id` in the URL
        try:
            price = Price.objects.get(id=price_id)
            serializer = PriceSerializer(
                price, data=request.data, partial=True)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)


class update_contact(APIView):
    def put(self, request, contact_id):
        # Assuming you're passing `student_id` in the URL
        try:
            contact = ContactMessage.objects.get(id=contact_id)
            serializer = ContactMessageSerializer(
                contact, data=request.data, partial=True)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ContactMessage.DoesNotExist:
            return Response({"error": "contact not found"}, status=status.HTTP_404_NOT_FOUND)


