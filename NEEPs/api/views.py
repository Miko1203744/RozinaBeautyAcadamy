import requests
from rest_framework import status
import json
from rest_framework.response import Response
from frontend.models import Student, Price, Course, ContactMessage, Notification
from .serializers import CourseReadSerializer, StudentSerializer, CourseSerializer, PriceSerializer, ContactMessageSerializer, NotificationSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.template.loader import render_to_string
from django.contrib import messages

from django.utils.html import strip_tags
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404, redirect


class DayCourseListAPIView(APIView):
    def get(self, request):
        courses = Course.objects.filter(day_or_night='Day')
        serializer = CourseReadSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NightCourseListAPIView(APIView):
    def get(self, request):
        courses = Course.objects.filter(day_or_night='Night')
        serializer = CourseReadSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StudentListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StudentCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = StudentSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # 👈 Add this line
            return Response(serializer.errors, status=400)
        
        


class CourseListCreateAPIView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseReadSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactListAPIView(APIView):
    def get(self, request):
        contact = ContactMessage.objects.all()
        serializer = ContactMessageSerializer(contact, many=True)
        return Response(serializer.data)


class PriceView(APIView):
    def get(self, request):
        prices = Price.objects.all()
        serializer = PriceSerializer(prices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PriceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
class CourseDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PriceListCreateAPIView(APIView):
    def get(self, request):
        prices = Price.objects.all()
        serializer = PriceSerializer(prices, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PriceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PriceDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            price = Price.objects.get(pk=pk)
        except Price.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PriceSerializer(price)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            price = Price.objects.get(pk=pk)
        except Price.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = PriceSerializer(price, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            price = Price.objects.get(pk=pk)
        except Price.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        price.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

'''


class ContactMessageCreateView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Your message has been sent successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_student(request, student_id):
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    student.delete()
    return redirect('/students')


def delete_course(request, course_id):
    try:
        course = Course.objects.get(pk=course_id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    course.delete()
    return redirect('/courses')


def delete_price(request, price_id):
    try:
        price = Price.objects.get(pk=price_id)
    except Price.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    price.delete()
    return redirect('/courses')


def delete_contact(request, contact_id):
    try:
        contact = ContactMessage.objects.get(pk=contact_id)
    except ContactMessage.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    contact.delete()
    return redirect('/contacts')


class TotalStudent(APIView):
    def get(self, request):
        TotalStudent = Student.objects.count()
        return JsonResponse({'totalstudent': TotalStudent}, status=status.HTTP_200_OK)


class TotalCourse(APIView):
    def get(self, request):
        TotalCourse = Course.objects.count()
        return JsonResponse({'totalcourse': TotalCourse}, status=status.HTTP_200_OK)


class NotificationListView(APIView):
    def get(self, request):
        notifications = Notification.objects.filter(is_read=False)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)


class NotificationActionView(APIView):
    def post(self, request, pk):
        action = request.data.get('action')
        email = request.data.get('student_email')
        username = request.data.get('student_name')
        student = Student.objects.get(id=pk)
        if action == 'accept':
            student.status = 'Accepted'
            subject = 'Account Creation Request Received'
            html_message = render_to_string(
                'email-template.html', {'username': username})
            plain_message = strip_tags(html_message)
            sender = f'Rozina Acadamy <{settings.EMAIL_HOST_USER}>'
            recipient_list = [email]

            '''send_mail(subject, plain_message, sender, recipient_list,
                      html_message=html_message, fail_silently=False)'''
            try:
               send_mail(subject, plain_message, sender, recipient_list, html_message=html_message, fail_silently=False)
               print("✅ Email sent successfully")
            except Exception as e:
                print(f"❌ Email sending failed: {e}")
            telegram_bot_token = settings.TELEGRAM_BOT_TOKEN  # Replace with your bot's token
            telegram_channel_id = settings.TELEGRAM_CHANNEL_ID
            telegram_message = (
                f"🎉 *A new student has been accepted!*\n\n"
                f"👤 *Name*: {student.first_name}\n"
                f"📧 *Email*: {student.email}\n"
            )

            # Send message to Telegram channel
            telegram_url = f"https://api.telegram.org/bot{telegram_bot_token}/sendMessage"
            payload = {
                'chat_id': telegram_channel_id,
                'text': telegram_message,
                'parse_mode': 'Markdown'
            }

            response = requests.post(telegram_url, data=payload)
            if response.status_code != 200:
                print(f"Failed to send message to Telegram: {response.json()}")

            messages.success(request, 'Acc created successfully!')
        elif action == 'reject':
            student.status = 'Rejected'
        student.save()
        Notification.objects.filter(student=student).update(is_read=True)
        return Response({'message': f'Student {action}ed successfully.'}, status=status.HTTP_200_OK)



def custom_login_view(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        username = body.get('username')
        print(username)
        password = body.get('password')
        print(password)
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Your logic here; typically you might want to log the user in
            return JsonResponse({'redirect': '/admin_s'})
        else:
            return JsonResponse({'detail': 'Invalid email or password.'}, status=400)
    return JsonResponse({'detail': 'Only POST requests are allowed.'}, status=405)


class LogoutView(APIView):
    def post(self, request):
        request.session.flush()
        return Response({'success': 'Logged out'}, status=200)