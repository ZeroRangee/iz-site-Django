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
        context['allappli'] =  Application.objects.all().count
        context['agreed'] =  Application.objects.filter(status="AGREED")
        return context