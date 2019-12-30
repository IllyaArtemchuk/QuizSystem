from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from homework.models import Quiz, Question
from .serializers import QuizSerializer, QuestionSerializer


class QuizViewSet(viewsets.ModelViewSet):
    """
    A Viewset for listing or retrieving quizes
    """
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuestionListView(ListAPIView):
    serializer_class = QuestionSerializer


    def get_queryset(self):
        """
        Returns a list of all questions in a quiz based on the url
        """
        quizID = self.kwargs['quizID']
        return Question.objects.filter(quiz__pk=quizID)
