from django.urls import path
from django.conf.urls import url

from . import views

from .api import api

app_name = 'indydash'

urlpatterns = [
    url(r'^$', views.react_bootstrap, name='view'),
    url(r'^api/', api.urls),
]