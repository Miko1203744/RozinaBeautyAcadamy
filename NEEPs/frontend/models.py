from django.db import models
from django.core.validators import EmailValidator
# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


class Student(models.Model):
    PENDING = 'Pending'
    ACCEPTED = 'Accepted'
    REJECTED = 'Rejected'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    enrollment_date = models.DateField(auto_now_add=True)
    course = models.ForeignKey(
        'Course', on_delete=models.SET_NULL, null=True, blank=True)
    bank_receipt = models.ImageField(
        upload_to='bank_receipts/', null=True, blank=True)
    photo = models.ImageField(
        upload_to='student_photos/', null=True, blank=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Price(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # Optional description of the pricing
    description = models.CharField(max_length=255, blank=True, null=True)
    valid_from = models.DateField()  # Optional start date for the pricing
    # Optional end date for the pricing
    valid_until = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.amount} - {self.description or 'No Description'}"


class Course(models.Model):
    DAY_NIGHT_CHOICES = [
        ('Day', 'Day'),
        ('Night', 'Night'),
    ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.PositiveIntegerField(help_text="Duration in weeks")
    price = models.ForeignKey(
        Price, related_name='courses', on_delete=models.SET_NULL, null=True, blank=True)
    photo = models.ImageField(
        upload_to='course_photos/', null=True, blank=True)  # Add course photo
    day_or_night = models.CharField(
        max_length=5, choices=DAY_NIGHT_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator()])
    subject = models.CharField(max_length=255)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}: {self.subject}"

    class Meta:
        ordering = ['-sent_at']  # Orders messages by the most recent first


class Notification(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField(
        default="A new student registration request is pending.")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=Student)
def create_notification_on_registration(sender, instance, created, **kwargs):
    if created and instance.status == 'Pending':
        Notification.objects.create(student=instance)

    def __str__(self):
        return f"Notification for {self.student.first_name} {self.student.last_name}"
