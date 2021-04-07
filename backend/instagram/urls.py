from django.urls import path
from . import views
from django.conf.urls import include,url
from django.contrib.auth.views import LoginView


urlpatterns = [
    path('api/todo/', views.TodoView.as_view()),
    path('api/current_user/', views.current_user),
    path('api/users/', views.UserList.as_view()),
    path('accounts/', include('django.contrib.auth.urls')),
]