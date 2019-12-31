from rest_framework import serializers
from homework.models import Quiz, Question, Choice, Course


class CourseSerializer(serializers.ModelSerializer):

    quizes = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Quiz.objects.all())

    class Meta:
        model = Course
        fields = ('id', 'title', 'description',
                  'teacher', 'students', 'quizes')


class QuizSerializer(serializers.ModelSerializer):

    questions = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Question.objects.all())

    class Meta:
        model = Quiz
        fields = ('id', 'title', 'course', 'questions')


class QuestionSerializer(serializers.ModelSerializer):

    choices = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Choice.objects.all())

    class Meta:
        model = Question
        fields = ('id', 'questionNumber', 'content', 'choices')
