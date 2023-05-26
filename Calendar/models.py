from django.db import models

# Create your models here.
class ProductionCalendar(models.Model):
    """Производственный календарь"""
    off_date = models.DateField('Дата')

    class Meta:
        ordering = ('-off_date',)
        verbose_name = 'Выходной день в производственном календаре'
        verbose_name_plural = 'Выходные дни в производственном календаре'