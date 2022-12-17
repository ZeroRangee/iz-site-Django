import json
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy
from django.contrib.auth import get_user_model
from django.views import View
from django.views.generic.edit import CreateView, FormView, ProcessFormView, BaseUpdateView
from django.views.generic import TemplateView, DetailView, DeleteView, UpdateView
from django.http import HttpResponse, JsonResponse, HttpRequest 
from django.contrib.auth.views import LogoutView, LoginView
from django.template.loader import render_to_string
from .forms import *
from .models import *
from django.views.generic import ListView
from django.core import serializers
import os

User = get_user_model()

class SingUpModalView(FormView):
    template_name = 'ModalSingUp.html'
    form_class = SingUpForm
    def post (self, request):
        form = SingUpForm(request.POST)
        username = request.POST['username']
        password = request.POST['password1']
        print(username, password)
        if form.is_valid():
            
            data =  {
                'first_name': form.cleaned_data['first_name'],
                'username': form.cleaned_data['username'],
                'email': form.cleaned_data['email'],
                'password1': form.cleaned_data['password1'],
                'password2': form.cleaned_data['password2'],
                
            }
            authenticate(self.request,username=username, password=password)
            form.save()
            
            
            return JsonResponse({'success': data})
        else:
            return JsonResponse({'errors': form.errors})
        
    def get_success_url(self):
        return reverse_lazy('profil')
    


class SingInModalView(LoginView):
    template_name = 'ModalSingUp.html'
    def post (self, request):
        form = SingInForm(data =request.POST)
        if form.is_valid():
            data =  {
                'username': form.cleaned_data['username'],
                'password': form.cleaned_data['password'],
            }
            user = form.get_user()
            login(request, user)
            return JsonResponse({'success': data})
        else:
            return JsonResponse({'errors': form.error_messages})
        
    def get_success_url(self):
        return reverse_lazy('profil')
    
class ShowApplication(ListView):
    model = Application
    template_name = 'application.html'
    context_object_name = 'application'
    
    def get_queryset(self):
        queryset = []
        if self.request.user.is_superuser:
            queryset =  Application.objects.all()
        else:
            queryset = Application.objects.filter(user=self.request.user)
        
        return queryset
    

    

 
class ProfilView(ListView):
    template_name = 'profil.html'
    model = Application
    
    
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "Профиль"
        return context   
    
        
class DeleteApplication(DeleteView):
    template_name = 'ApplicationDeleteModal.html'
    model = Application
    success_url = reverse_lazy('profil')

class DeleteCategory(FormView):
    template_name = 'deleteCategory.html'
    model = Category
    success_url = reverse_lazy('profil')
    
    def post(self, request, pk):
        form = CategoryDelete(request.POST)
        if form.is_valid():
            data = {
                'categoryDelete': form.cleaned_data['categoryDelete'],
            }
            Category.objects.filter(id=pk).delete()
            Application.objects.filter(cat=pk).delete()
            
            return JsonResponse({'success': data})
        else:
            return JsonResponse({'errors': form.errors})
            
    

class UpdataApplicationAgreed(CreateView):
    model = AfterPhoto
    template_name = 'ApplicationUpdate_form.html'
    success_url = reverse_lazy('profil')
    fields = ['photo_after']
    def post(self, request, pk):
        form = ApplicationAgreedUpdateForms(request.POST,request.FILES)     

        if form.is_valid():
            data =  {
                'photo_after': json.dumps(str(form.cleaned_data['photo_after']), ensure_ascii=False,separators=None),
            }
           
            # Application.objects.filter(id=pk).update( status=Status.AGREED)
            form.save() 
            numb = AfterPhoto.objects.all().count()
            idAfter = AfterPhoto.objects.get(pk=AfterPhoto.objects.all()[numb-1:numb])
            Application.objects.filter(id=pk).update( status=Status.AGREED, pa=idAfter)

            return JsonResponse({'success': data})
        else:
            return JsonResponse({'errors': form.errors})
        
class UpdataApplicationRejected(FormView):
    model = Application
    template_name = 'ApplicationRejected_form.html'
    success_url = reverse_lazy('profil')

    def post(self, request, pk):
        form = ApplicationRejectedUpdateForms(request.POST)     

        if form.is_valid():
            data =  {
                'rejection_reason': form.cleaned_data['rejection_reason'],
            }
            Application.objects.filter(id=pk).update(rejection_reason=form.cleaned_data['rejection_reason'], status=Status.REJECTED)

            return JsonResponse({'success': data})
        else:
            
            return JsonResponse({'errors': form.errors})



class AddCategory(CreateView):
    model = Category
    template_name = 'CategoryAddModal.html'
    
    def post(self, request):
        form = CategoryAddForms(request.POST)     

        if form.is_valid():
            data =  {
                'category': form.cleaned_data['category'],
            }
            form.save()
            
            return JsonResponse({'success': data})
        else:
            # print(form.cleaned_data['username'], form.cleaned_data['password'])
            print(form.errors)
            return JsonResponse({'errors': form.errors})
            
class ApplicationAdd(CreateView):
    template_name = 'ModalZayvkaUp.html'
    model = Application
    def post (self, request):
        form = ApplicationAddForms(request.POST,request.FILES)
        # form.fields = request.FILES['photo']
        if form.is_valid():
            photo = request.FILES['photo']
            
            data =  {
                'title': form.cleaned_data['title'],
                'photo': json.dumps(str(form.cleaned_data['photo']), ensure_ascii=False,separators=None),
                'content': form.cleaned_data['content'],
                'cat': str(form.cleaned_data['cat']),
            }

            form.save().user.add(self.request.user)
            
            return JsonResponse({'success': data})
        else:
            # print(form.cleaned_data['username'], form.cleaned_data['password'])
            print({'errors': form.errors})
            return JsonResponse({'errors': form.errors})



class ShowApplicationAgreed(ListView):
    model = Application
    template_name = 'application.html'
    context_object_name = 'application'
    
    def get_queryset(self):
        queryset = []
        if self.request.user.is_superuser:
            queryset =  Application.objects.filter(status="AGREED")
        else:
            queryset = Application.objects.filter(user=self.request.user, status="AGREED")
        
        return queryset
    
class ShowApplicationCreated(ListView):
    model = Application
    template_name = 'application.html'
    context_object_name = 'application'
    
    def get_queryset(self):
        queryset = []
        if self.request.user.is_superuser:
            queryset =  Application.objects.filter(status="CREATED")
        else:
            queryset = Application.objects.filter(user=self.request.user, status="CREATED")
        
        return queryset
class ShowApplicationRejected(ListView):
    model = Application
    template_name = 'application.html'
    context_object_name = 'application'
    
    def get_queryset(self):
        queryset = []
        if self.request.user.is_superuser:
            queryset =  Application.objects.filter(status="REJECTED")
        else:
            queryset = Application.objects.filter(user=self.request.user, status="REJECTED")
        
        return queryset

class Logout(LogoutView):
    redirect_field_name = 'home' 