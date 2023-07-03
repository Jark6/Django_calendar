from django.urls import path

from .views import CalendarPageView, get_dates

urlpatterns = [
    path("", CalendarPageView.as_view(), name="home"),
    #path("/<int:year>/", get_dates(), name="my-json"),
]