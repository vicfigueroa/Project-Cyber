from django.db import models
from django.urls import reverse

# Create your models here.


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50, default=True)
    year = models.PositiveSmallIntegerField(default=True)
    vin = models.CharField(max_length=17, unique=True)
    href = models.CharField(max_length=200, null=True)


class SalesPerson(models.Model):
    employee_name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=17, unique=True)


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200, unique=True)
    phone_number = models.CharField(max_length=10, unique=True, default=None)


class Sales(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO, related_name="automobile", on_delete=models.CASCADE
    )
    sales_person = models.ForeignKey(
        SalesPerson, related_name="sales", on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer, related_name="customers", on_delete=models.CASCADE
    )
    sales_price = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_employee_sales", kwargs={"vin": self.automobile})
