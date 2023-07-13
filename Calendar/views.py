from datetime import datetime
from django.shortcuts import render
from .models import ProductionCalendar
import json

# Create your views here.
def get_dates(request):
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

