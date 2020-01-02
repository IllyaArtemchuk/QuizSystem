from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from .models import Student, Teacher


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'role')


class CustomRegisterSerializer(RegisterSerializer):

    role = serializers.CharField(max_length=2)

    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'password', 'role')


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('user')


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('user')
