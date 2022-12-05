from django.db import models
from django.urls import reverse
from django.contrib.auth.models import  User

class Status(models.TextChoices):
    CREATED = 'CREATED', 'Новая заявка'
    AGREED = 'AGREED', 'Заявка решена'
    REJECTED = 'REJECTED', 'Заявка отклонена'


class Application(models.Model):
    user = models.ManyToManyField(to=User, related_name ="applicationUser", verbose_name="Автор заявки")
    title = models.CharField(max_length=255, verbose_name="Название заявки")
    content = models.TextField(blank=True, verbose_name="Описание заявки")
    rejection_reason = models.TextField(blank=True, verbose_name="Причина отказа", null=True)
    photo_after = models.ImageField(upload_to='photo/%Y/%m/%d/', verbose_name="Фотография заявки после",  null=True)
    photo = models.ImageField(upload_to='photo/%Y/%m/%d/', verbose_name="Фотография заявки")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Время создание заявки")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Время изменения заявки")
    is_published = models.BooleanField(default=True, verbose_name="Публикация")
    status = models.CharField(Status, max_length=30, choices = Status.choices, default=Status.CREATED)

    cat = models.ForeignKey('Category', on_delete=models.PROTECT, null=True,related_name ="applicationCategory",  verbose_name="Категория", blank=True)
    
    def __str__(self):
        return f" Заявка - { self.pk }, статус заявки - {self.status} "
    
    
    def get_absolute_url(self):
        return reverse("application", kwargs={"pk": self.pk})
    
    class Meta:
        verbose_name = "Заявки"
        verbose_name_plural = "Заявки"
        ordering = ['status']
    
    
class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True,verbose_name = "Категория") 
    
    # def get_absolute_url(self):
    #     return reverse("category", kwargs={"cat_id": self.pk})
    
    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ['id']
        
    def __str__(self):
        return self.name