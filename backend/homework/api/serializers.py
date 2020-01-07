from rest_framework import serializers
from homework.models import Quiz, GradedQuiz, Question, Choice, Course
from users.serializers import StudentSerializer
from django.contrib.auth import get_user_model


class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ('id', 'text', 'choice_number', 'question')


class QuestionSerializer(serializers.ModelSerializer):

    choices = ChoiceSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = ('id', 'question_number', 'content', 'correct_answer', 'quiz',
                  'choices', )


class QuizSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True, required=False)

    class Meta:
        model = Quiz
        fields = ('id', 'title', 'course', 'questions', 'teacher')


class CourseSerializer(serializers.ModelSerializer):

    quizes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'created_at',
                  'teacher', 'students', 'quizes')


class GradedQuizSerializer(serializers.ModelSerializer):

    quiz = QuizSerializer()

    class Meta:
        model = GradedQuiz
        fields = ('id', 'student', 'quiz', 'grade', 'created_at')
