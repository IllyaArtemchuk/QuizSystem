from django.urls import path, include
from .views import (QuestionListView,
                    CourseTeacherView,
                    CourseDetailView,
                    QuizCourseView,
                    QuizDetailView)



urlpatterns = [
    path('<int:quizID>/questions/', QuestionListView.as_view()),
    path('<int:teacherID>/courses/', CourseTeacherView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('<int:courseID>/quizes/', QuizCourseView.as_view()),
    path('quiz/<int:pk>/', QuizDetailView.as_view())
    ] 

