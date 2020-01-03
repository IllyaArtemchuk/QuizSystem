from rest_framework import serializers
from homework.models import Quiz, GradedQuiz, Question, Choice, Course
from users.serializers import StudentSerializer


class GradedQuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = GradedQuiz
        field = ('id', 'student', 'quiz', 'grade')


class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        field = ('id', 'text', 'choice_number')


class QuestionSerializer(serializers.ModelSerializer):

    choices = ChoiceSerializer

    class Meta:
        model = Question
        fields = ('id', 'question_number', 'content', 'choices')


class QuizSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ('id', 'title', 'course', 'questions', 'teacher')


class CourseSerializer(serializers.ModelSerializer):

    quizes = QuizSerializer(many=True)

    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'created_at',
                  'teacher', 'students', 'quizes')
