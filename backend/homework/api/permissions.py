from rest_framework import permissions
from users.models import Student


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.role == "TE":
                return True
            else:
                return False
        else:
            return False


class IsTeacherOrIsStudentReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        studentUser = Student.objects.filter(user=request.user).first()
        if obj.students.all():
            if studentUser in obj.students.all():
                if request.method in permissions.SAFE_METHODS:
                    return True
        return obj.teacher == request.user


class IsTeacherOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.teacher == request.user


class StudentReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return False
