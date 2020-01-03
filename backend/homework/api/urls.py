from django.urls import path
from .views import (CurrentUserView,
                    QuestionListView,
                    CourseListView,
                    CourseDetailView,
                    QuizListView,
                    QuizDetailView,
                    CourseCreateView)


urlpatterns = [
    path('user/', CurrentUserView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/create/', CourseCreateView.as_view()),
    path('quizes/<int:courseID>/', QuizListView.as_view()),
    path('quiz/<int:pk>/', QuizDetailView.as_view())
]
