from django.contrib import admin
from .models import *
# Register your models here.
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'title','content', 'time_create', 'photo', 'is_published')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'content')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category')
    list_display_links = ('id', 'category')
    search_fields = ('category',)
    
class PhotoAfterAdmin(admin.ModelAdmin):
    list_display = ('id', 'photo_after')
    list_display_links = ('id', 'photo_after')
    search_fields = ('photo_after',)


admin.site.register(Application, ApplicationAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(AfterPhoto, PhotoAfterAdmin)