from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        ("ST", "Student"),
        ("TE", "Teacher")
    )

    role = models.CharField(
        max_length=2,
        choices=ROLE_CHOICES
    )

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created and self.role == 1:
            Student.objects.create(user=self)
        elif created and self.role == 2:
            Teacher.objects.create(user=self)


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
