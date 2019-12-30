from django.contrib import admin
from .models import Quiz, Question, Choice, Course


class QuestionInline(admin.TabularInline):
    model = Question

class QuizAdmin(admin.ModelAdmin):
    inline = [
        QuestionInline,
    ]

admin.site.register(Quiz,QuizAdmin)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Course)

