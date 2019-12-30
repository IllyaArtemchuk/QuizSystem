from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import viewsets
from rest_framework.response import Response
from homework.models import Quiz, Question, Course
from .serializers import QuizSerializer, QuestionSerializer, CourseSerializer



#Course Query Views

class CourseTeacherView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        """
        Returns the list of courses a teacher teaches
        """
        teacherID = self.kwargs['teacherID']
        return Course.objects.filter(teacher__pk=teacherID)

class CourseDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()





#Quiz Query Views
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
