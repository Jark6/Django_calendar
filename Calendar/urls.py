from django.urls import path

from .views import CalendarPageView

urlpatterns = [
    path("", CalendarPageView.as_view(), name="home"),
]