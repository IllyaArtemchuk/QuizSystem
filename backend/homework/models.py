from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
from users.models import Student
from datetime import datetime
from django.utils import timezone


class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    teacher = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Quiz(models.Model):
    title = models.CharField(max_length=180)
    teacher = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="quizes", null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class GradedQuiz(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    student = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    grade = models.FloatField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return 'graded quiz {} for {}'.format(self.quiz.title, self.student.username)


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name="questions")
    question_number = models.PositiveIntegerField()
    content = models.CharField(max_length=400)
    correct_answer = models.PositiveIntegerField(default=1, validators=[
        MaxValueValidator(6),
        MinValueValidator(1)
    ])

    def __str__(self):
        return 'question {} for {}'.format(self.question_number, self.quiz.title)


class Choice(models.Model):
    text = models.CharField(max_length=200)
    question = models.ForeignKey(
        Question, related_name="choices", on_delete=models.CASCADE)
    choice_number = models.PositiveIntegerField(default=1, validators=[
        MaxValueValidator(6),
        MinValueValidator(1)
    ])

    def __str__(self):
        return 'choice for question {}'.format(self.question.question_number)
