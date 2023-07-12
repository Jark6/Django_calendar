from datetime import datetime
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.shortcuts import render
from .models import ProductionCalendar
from django.core import serializers
import json

# Create your views here.
def get_dates(request):
    #get_all_dates = ProductionCalendar.objects.filter(off_date__year=2023).values('off_date')
    #json_data = json.dumps(serializers.serialize('json', get_all_dates, fields="off_date"))
    #dates_list = [d['off_date'] for d in get_all_dates]
    #json_data = json.dumps(dates_list, default=str)
    #print(get_all_dates)
    #print(json_data)
    #json_data_dict = json.loads(json_data)
   # return JsonResponse(json_data, safe=False)#JsonResponse(list(get_all_dates), safe=False)
    if request.method == 'GET':
        year = request.GET.get('year')
        dates = list(ProductionCalendar.objects.filter(off_date__year=year).values('off_date'))
        dates_list = [d['off_date'].strftime('%Y-%m-%d') for d in dates]
        print(dates_list)
        context = {'off_dates': dates_list}
        return render(request, "Calendar/calendar_view.html", context)
    if request.method == 'POST':
        year = request.POST.get('my_year')
        dates = request.POST.get('my_dates')
        ProductionCalendar.objects.filter(off_date__year=year).delete()
        dates_list = json.loads(dates)
        print(year)
        print(dates_list)
        for el in dates_list:
            my_date = datetime.strptime(el, '%Y-%m-%d')
            off_date = ProductionCalendar(off_date=my_date)
            off_date.save()
        return render(request, 'Calendar/calendar_view.html')
    else:
            return render(request, 'Calendar/calendar_view.html')

def save_dates(request):
  if request.method == 'POST':
    year = request.POST.get('my_year')
    dates = request.POST.get('my_dates')
    ProductionCalendar.objects.filter(off_date__year=year).delete()
    for date in dates:
        my_date = ProductionCalendar(my_date=date)
        my_date.save()
  else:
    return render(request, "Calendar/calendar_edit.html")

class CalendarPageView(TemplateView):
    model = ProductionCalendar
    template_name = "Calendar/calendar_view.html"
