from django.urls import path
from .views import get_dates, index
#from .views import CalendarPageView

urlpatterns = [
    #   path("", CalendarPageView.as_view(), name="home"),
    path("", get_dates, name="home"),
    #path("", index, name="home"),
    #path("/<int:year>/", get_dates(), name="my-json"),
]