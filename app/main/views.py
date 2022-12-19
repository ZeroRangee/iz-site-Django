import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.views.generic import  TemplateView,  DetailView, ListView
from users.models import *





class Main(ListView):
    template_name = 'index.html'
    model = Application
    context_object_name = 'application'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "Ижевск"
        context['agreed'] =  Application.objects.filter(status="AGREED").order_by('-time_update')[:4]

        return context
        
class ApplicationAgreedFour(ListView):
    template_name = 'applicationAgreed.html'
    model = Application

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['agreed'] =  Application.objects.filter(status="AGREED").order_by('-time_update')[:4]
        return context
    
class CountAgreed(TemplateView):
    model = Application
    
    def get(self, request):
        numb = len(Application.objects.filter(status="AGREED"))
        # numb = [ i for i in numb]
        return JsonResponse({'data': numb})