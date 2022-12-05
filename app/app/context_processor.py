from users.forms import *
from users.models import Application

def singup(request):
    return {
        'formSingup': SingUpForm(),
    }
    
def singin(request):
    return {
        'formSingin': SingInForm(),
    }
    
def applicationadd(request):
    return { 'applicationadd':  ApplicationAddForms(), }

def applicationaUpdateAgreed(request):
    return { 'applicationAgreed':  ApplicationAgreedUpdateForms(), }

def applicationaUpdateRejected(request):
    return { 'applicationRejected':  ApplicationRejectedUpdateForms(), }

def categoryAdd(request):
    return { 'categoryAdd':  CategoryAddForms, }

