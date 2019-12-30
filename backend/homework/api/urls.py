from .views import QuestionListView, QuizViewSet
from rest_framework.routers import SimpleRouter
from django.urls import path, include

router = SimpleRouter()
router.register(r'quizes', QuizViewSet)

urlpatterns = [
    path('<int:quizID>/questions/', QuestionListView.as_view())] 

urlpatterns += router.urls