from django.views.generic import TemplateView
from .models import ProductionCalendar

# Create your views here.
class CalendarPageView(TemplateView):
    model = ProductionCalendar
    template_name = "base.html"