from rest_framework import serializers
from frontend.models import *

'''
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'email', 'date_of_birth', 'address',
                  'phone_number', 'enrollment_date', 'course', 'bank_receipt', 'photo']

'''


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = ['id', 'amount', 'description', 'valid_from', 'valid_until']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    student = StudentSerializer()  # Include student details in notifications

    class Meta:
        model = Notification
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'name', 'description',
                  'duration', 'price', 'photo']


class CourseReadSerializer(serializers.ModelSerializer):
    price = PriceSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description',
                  'duration', 'price', 'photo']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message']
