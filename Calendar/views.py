from django.views.generic import TemplateView
from django.http import JsonResponse
from django.shortcuts import render
from .models import ProductionCalendar
from django.core import serializers
import json


# Create your views here.
def get_dates(request, year):
    #get_all_dates = ProductionCalendar.objects.filter(off_date__year=year).values()
    #json_data = json.dumps(serializers.serialize('json', get_all_dates, fields="off_date"))
    #print(get_all_dates)
    #print(json_data)
    #json_data_dict = json.loads(json_data)
    #return JsonResponse(list(get_all_dates), safe=False)#JsonResponse(json_data_dict, safe=False)
    dates = ProductionCalendar.objects.filter(off_date__year=year).values_list('off_date', flat=True)
    return render(request, "Calendar/calendar_view.html", JsonResponse(list(dates), safe=False))



class CalendarPageView(TemplateView):
    model = ProductionCalendar
    template_name = "Calendar/calendar_view.html"
