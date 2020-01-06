from django.urls import path
from .views import (CurrentUserView,
                    CourseListView,
                    CourseDetailView,
                    QuizListView,
                    QuizDetailView,
                    QuizCreateView,
                    CourseCreateView,
                    GradedQuizListView,
                    GradedQuizCreateView)


urlpatterns = [
    path('user/', CurrentUserView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/create/', CourseCreateView.as_view()),
    path('quizes/<int:courseID>/', QuizListView.as_view()),
    path('quiz/<int:pk>/', QuizDetailView.as_view()),
    path('quiz/create/', QuizCreateView.as_view()),
    path('graded/', GradedQuizListView.as_view()),
    path('grade/', GradedQuizCreateView.as_view())
]
