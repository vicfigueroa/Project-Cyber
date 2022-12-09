from django.contrib import admin
from .models import AutomobileVO, SalesPerson, Sales, Customer

# Register your models here.
admin.site.register(Sales)
admin.site.register(SalesPerson)
admin.site.register(AutomobileVO)
admin.site.register(Customer)
