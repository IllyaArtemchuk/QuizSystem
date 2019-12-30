from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
from users.models import Student



class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    teacher = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    students = models.ManyToManyField(Student)

    def __str__(self):
        return self.title



class Quiz(models.Model):
    title = models.CharField(max_length=180)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="quizes", null=True)
    

    def __str__(self):
        return self.title



class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    questionNumber = models.PositiveIntegerField()
    content = models.CharField(max_length=400)
    correct_answer = models.PositiveIntegerField(default=1, validators=[
        MaxValueValidator(6),
        MinValueValidator(1)
    ])

    def __str__(self):
        return 'question {} for {}'.format(self.questionNumber, self.quiz.title )


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length=200)
    choiceID = models.PositiveIntegerField(default=1, validators=[
        MaxValueValidator(6),
        MinValueValidator(1)
    ])

    def __str__(self):
        return  'Choice {} for question {} from {}'.format(self.choiceID, self.question.questionNumber, self.question.quiz.title)





