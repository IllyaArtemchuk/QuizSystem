from django.urls import path
from .views import (QuestionListView,
                    CourseTeacherView,
                    CourseDetailView,
                    QuizCourseView,
                    QuizDetailView,
                    CourseCreateView)


urlpatterns = [
    path('<int:quizID>/questions/', QuestionListView.as_view()),
    path('<int:userID>/courses/', CourseTeacherView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/create/', CourseCreateView.as_view()),
    path('<int:courseID>/quizes/', QuizCourseView.as_view()),
    path('quiz/<int:pk>/', QuizDetailView.as_view())
]
