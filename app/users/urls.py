
from django.urls import include, path
from .views import *
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('SingUp/', SingUpModalView.as_view(), name='SingUp'),
    path('SingIn/', SingInModalView.as_view(), name='SingIn'),
    path('logout/', Logout.as_view(), name='logout'),
    path('profil/', ProfilView.as_view(), name='profil'),
    path('profil/addApplication',  ApplicationAdd.as_view(), name='addApplication'),
    path('profil/<int:pk>/',  ShowApplication.as_view(), name='ApplicationShow'),
    path('profil/deleteApplication/<int:pk>/',  DeleteApplication.as_view(), name='deleteApplication'),
    path('profil/updateApplication/<int:pk>/',  UpdataApplicationAgreed.as_view(), name='updateApplication'),
    path('profil/rejectedApplication/<int:pk>/',  UpdataApplicationRejected.as_view(), name='rejectedApplication'),
    path('profil/categoryAdd/',  AddCategory.as_view(), name='categoryAdd'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)