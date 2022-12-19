from django.urls import include, path
from main.views import *

urlpatterns = [
    path('', Main.as_view(), name='home'),
    path('applicationAgreed/', ApplicationAgreedFour.as_view(), name='fourAgreed'),
    path('countAgreed/', CountAgreed.as_view(), name='countAgreed'),
]