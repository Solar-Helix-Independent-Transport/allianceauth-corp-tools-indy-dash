from django.urls import path
from django.urls import re_path

from . import views

from .api import api

app_name = 'indydash'

urlpatterns = [
    re_path(r'^$', views.get_structure_list, name='view'),
    re_path(r'^bs3/', views.react_bootstrap, name='view-bs3'),
    re_path(r'^api/', api.urls),
]