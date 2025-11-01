from django.contrib import admin
from .models import Student, Course, Price, ContactMessage, Notification
# Register your models here.


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email',
                    'date_of_birth', 'phone_number', 'enrollment_date', 'course')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('enrollment_date', 'course')
    ordering = ('-enrollment_date',)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration')
    search_fields = ('name',)
    ordering = ('name',)


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ('amount', 'description', 'valid_from', 'valid_until')
    search_fields = ('amount', 'description')
    ordering = ('-valid_from',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'sent_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('sent_at',)
    ordering = ('-sent_at',)


admin.site.register(Notification)
