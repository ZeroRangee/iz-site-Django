from django import forms
from django.template.defaultfilters import filesizeformat
from .models import *
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, FileExtensionValidator, validate_image_file_extension
from django.contrib.auth.forms import AuthenticationForm

class ApplicationAddForms(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Название'}), required=False)
    content = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Описание'}),required=False)
    photo = forms.ImageField(required=False,label="Фотография", validators=[
        FileExtensionValidator(
            allowed_extensions=['jpg','jpeg', 'png', 'bmp'],
            message='Вы берите другой формат изображения!!!'
        ),
        
    ])
    # cat = forms.ModelChoiceField(widget=forms.Select(), queryset=Category.objects.all(), empty_label='Выбирете категорию', required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['cat'].empty_label = "Категория не выбрана"
        

    def clean(self):
        pass 
    
    
    def clean_cat(self):
        cat = self.cleaned_data['cat']
        if cat is None:
            raise ValidationError(message='Выберите категорию', code='invalid')
        return cat
    def clean_photo(self):
        photo = self.cleaned_data['photo']
        if photo is None:
            raise ValidationError(message='Загрузите фотографию', code='invalid')
        if photo.size > 10485760:
            raise ValidationError(message='Файл должен весить меньше 10мб', code='invalid')
        return photo
    
    def clean_content(self):
        content = self.cleaned_data['content']
        if content == '':
            raise ValidationError(message='Заполните поле описание', code='invalid')
        return content
    
    def clean_title(self):
        title = self.cleaned_data['title']
        if title == '':
            raise ValidationError(message='Заполните поле название', code='invalid')
        return title 

    class Meta:
        model = Application
        fields = ['title', 'photo', 'content', 'cat']
        
class ApplicationAgreedUpdateForms(forms.Form):
    photo_after = forms.ImageField(required=False,label="Фотография", validators=[
        FileExtensionValidator(
            allowed_extensions=['jpg','jpeg', 'png', 'bmp'],
            message='Вы берите другой формат изображения!!!'
        ),
        
    ])
    def clean_photo_after(self):
        photo = self.cleaned_data['photo_after']
        if photo is None:
            raise ValidationError(message='Загрузите фотографию', code='invalid')
        if photo.size > 10485760:
            raise ValidationError(message='Файл должен весить меньше 10мб', code='invalid')
        return photo
    class Meta:
        model = Application
        fields = ['photo_after']

class ApplicationRejectedUpdateForms(forms.Form):
    rejection_reason = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Причина отказа'}),required=False, label='')
    
    def clean_rejection_reason(self):
        photo = self.cleaned_data['rejection_reason']
        if photo is None:
            raise ValidationError(message='Загрузите фотографию', code='invalid')
        return photo
    class Meta:
        model = Application
        fields = ['rejection_reason']
        
class CategoryAddForms(forms.ModelForm):
    category = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Название категории'}), required=False)
    
    def clean_category(self):
        category = self.cleaned_data['category']
        if category == '':
            raise ValidationError(message='НАпишите категорию', code='invalid')
        return category
    class Meta:
        model = Category
        fields = ['category']
        
class CategoryDelete(forms.Form):
    
    categoryDelete = forms.ModelChoiceField(widget=forms.Select(),queryset=Category.objects.all(), required=False)
    
    def clean_categoryDelete(self):
        categoryDelete = self.cleaned_data['categoryDelete']
        
        if categoryDelete == '':
            raise ValidationError(message='Выберите категорию', code="invalid")
        return categoryDelete
    
    class Meta:
        model = Category
        fields = ["categoryDelete"]
        
        
        
class SingUpForm(UserCreationForm):
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'autocomplete': 'text', 'placeholder': 'Введите ФИО'}),
        required=False,
        validators=[RegexValidator(r'[^0-9a-zA-Z]', "Введите ФИО кириллицой")]
        
    )
    username =  forms.CharField(
        widget=forms.TextInput(attrs={'autocomplete': 'text', 'placeholder': 'Введите логин'}),
        required=False,
        validators=[RegexValidator(r'[^0-9а-яА-ЯёЁ]', "Введите логин латиницой")],
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'autocomplete': 'email','placeholder': 'Введите электрону почту ' }),
        required=False
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={ 'placeholder': 'Введите пароль '}),
        required=False
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Повторите пароль'}),
        required=False
    )
    
    
    def clean_password(self):
        password = self.cleaned_data['password1']
        if password == '':
            raise ValidationError('Введите пароль', code='invalid')
        return password 
    def clean_username(self):
        username = self.cleaned_data['username']
        if username == '':
            raise ValidationError('Введите логин ', code='invalid')
        return username
    def clean_first_name(self):
        first_name = self.cleaned_data['first_name']
        if first_name == '':
            raise ValidationError('Введите ФИО', code='invalid')
        return first_name
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ("first_name","username", "email", "password1", "password2")
        
        
class SingInForm(AuthenticationForm):
    username = forms.CharField(
        label=(""),
        max_length=254,
        widget=forms.TextInput(
            attrs={
                'autocomplete': 'text',
                'placeholder': 'Логин'
            }
        ),
        required=False
    )
    password = forms.CharField(
        label=(""),
        widget=forms.PasswordInput(
            attrs={
                "autocomplete": "current-password",
                'placeholder': 'Пароль'
            }
        ),
        required=False
    )
    
    error_messages = {
        "invalid_login": (
            "Введите логин и пароль правильно"
        ),
    }
    
