from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import IsTeacher, IsTeacherOrReadOnly
from homework.models import Quiz, Question, Course
from users.models import User, Teacher, Student
from .serializers import QuizSerializer, QuestionSerializer, CourseSerializer
from users.serializers import UserSerializer


# User Details
class CurrentUserView(RetrieveAPIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


# Course Query Views

class CourseListView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        """
        Returns the list of courses the signed in teacher teaches or student takes
        """
        user = self.request.user
        if user.role == "ST":
            return Course.objects.filter(students__user=user)
        elif user.role == "TE":
            return Course.objects.filter(teacher=user)


class CourseDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsTeacherOrReadOnly, )
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class CourseCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, IsTeacher, )
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


# Quiz Query Views
class QuizCourseView(ListAPIView):
    serializer_class = QuizSerializer

    def get_queryset(self):
        """
        Returns the list of courses a teacher teaches
        """
        courseID = self.kwargs['courseID']
        return Quiz.objects.filter(course__pk=courseID)


class QuizDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuestionListView(ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        """
        Returns a list of all questions in a quiz based on the url
        """
        quizID = self.kwargs['quizID']
        return Question.objects.filter(quiz__pk=quizID)
