from django.urls import path
from .views import get_dates

urlpatterns = [
    path("", get_dates, name="home"),
   ]