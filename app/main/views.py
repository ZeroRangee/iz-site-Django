from django.shortcuts import render
from django.views.generic import  TemplateView,  DetailView, ListView
from users.models import *





class Main(ListView):
    template_name = 'index.html'
    model = Application
    context_object_name = 'application'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "Ижевск"
        context['allappli'] =  Application.objects.filter(status="AGREED").count
        context['agreed'] =  Application.objects.filter(status="AGREED").order_by('-time_update')[:4]
        return context
        
        