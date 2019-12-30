from rest_framework import serializers
from homework.models import Quiz, Question, Choice

class QuizSerializer(serializers.ModelSerializer):

    questions = serializers.PrimaryKeyRelatedField(many=True, queryset=Question.objects.all())

    class Meta:
        model = Quiz
        fields = ('title', 'teacher', 'questions')     

class QuestionSerializer(serializers.ModelSerializer):

    choices = serializers.PrimaryKeyRelatedField(many=True, queryset=Choice.objects.all())

    class Meta:
        model = Question
        fields = ('questionNumber', 'content', 'choices')
       