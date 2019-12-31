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

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created and self.Role == "ST":
            Student.objects.create(user=self)
        elif created and self.Role == "TE":
            Teacher.objects.create(user=self)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
