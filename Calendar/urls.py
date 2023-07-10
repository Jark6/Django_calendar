from django.urls import path
from .views import get_dates, save_dates
#from .views import CalendarPageView

urlpatterns = [
    #   path("", CalendarPageView.as_view(), name="home"),
    path("", get_dates, name="home"),
    path("edit", save_dates, name="edit"),
    #path("", index, name="home"),
    #path("/<int:year>/", get_dates(), name="my-json"),
]