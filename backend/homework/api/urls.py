from django.urls import path
from .views import (UserDetailView,
                    QuestionListView,
                    CourseListView,
                    CourseDetailView,
                    QuizCourseView,
                    QuizDetailView,
                    CourseCreateView)


urlpatterns = [
    path('user/<int:pk>/', UserDetailView.as_view()),
    path('<int:quizID>/questions/', QuestionListView.as_view()),
    path('<int:userID>/courses/', CourseListView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/create/', CourseCreateView.as_view()),
    path('<int:courseID>/quizes/', QuizCourseView.as_view()),
    path('quiz/<int:pk>/', QuizDetailView.as_view())
]
