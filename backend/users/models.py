from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    STUDENT = "ST"
    TEACHER = "TE"
    ROLE_CHOICES = [
        (STUDENT, "Student"),
        (TEACHER, "Teacher")
    ]


    Role = models.CharField(
        max_length=2,
        choices=ROLE_CHOICES,
        default=STUDENT
    )

    def __str__(self):
        return self.username

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
