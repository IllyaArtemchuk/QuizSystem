from django.urls import path
from .views import (CurrentUserView,
                    StudentDetailView,
                    CourseListView,
                    CourseDetailView,
                    CourseCreateView,
                    AllCourseListView,
                    QuizListView,
                    QuizDetailView,
                    QuizCreateView,
                    GradedQuizListView,
                    GradedQuizCreateView,
                    QuestionCreateView,
                    ChoiceCreateView,
                    )


urlpatterns = [
    path('user/', CurrentUserView.as_view()),
    path('student/<pk>/', StudentDetailView.as_view()),
    path('courses/', CourseListView.as_view()),
    path('courses/all/', AllCourseListView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/create/', CourseCreateView.as_view()),
    path('quizes/<int:courseID>/', QuizListView.as_view()),
    path('quiz/<int:pk>/', QuizDetailView.as_view()),
    path('quiz/create/', QuizCreateView.as_view()),
    path('graded/', GradedQuizListView.as_view()),
    path('grade/', GradedQuizCreateView.as_view()),
    path('question/create/', QuestionCreateView.as_view()),
    path('choice/create/', ChoiceCreateView.as_view()),
]
