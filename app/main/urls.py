from django.urls import include, path
from main.views import *

urlpatterns = [
    path('', Main.as_view(), name='home'),
]