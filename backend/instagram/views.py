from django.shortcuts import render
from .serializers import TodoSerializer,UserProfileSerializer
from .models import Todo,UserProfile
from rest_framework import generics
from rest_framework import viewsets
# for login
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

# class TodoView(generics.ListCreateAPIView):
#     queryset = Todo.objects.all()
#     serializer_class = TodoSerializer

class TodoView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = (IsOwner,)

    # Ensure a user sees only own Todo objects.
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Todo.objects.filter(owner=user)
        raise PermissionDenied()

    # Set user as owner of a Todo object.
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

# view for login functionality
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#