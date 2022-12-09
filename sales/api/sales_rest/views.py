from django.shortcuts import render
from .models import (
    AutomobileVO,
    Customer,
    Sales,
    SalesPerson,
)
from .encoders import (
    SalesPersonEncoder,
    CustomerEncoder,
    SalesListEncoder,
)
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sales.objects.all()
        return JsonResponse({"sales": sales}, encoder=SalesListEncoder)
    else:
        content = json.loads(request.body)
        employee_number = content["sales_person"]
        sales_person = SalesPerson.objects.get(employee_number=employee_number)
        content["sales_person"] = sales_person
        customer = content["customer"]
        customer = Customer.objects.get(id=customer)
        content["customer"] = customer
        vin = content["automobile"]
        vin = AutomobileVO.objects.get(vin=vin)
        content["automobile"] = vin
        sale = Sales.objects.create(**content)
        try:
            return JsonResponse(
                sale,
                encoder=SalesListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Sale could not be created"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sale(request, id=None):
    if request.method == "GET":
        sales = Sales.objects.get(id=id)
        return JsonResponse(
            sales,
            encoder=SalesListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            sale = Sales.objects.get(id=id)
            sale.delete()
            return JsonResponse(sale, encoder=SalesListEncoder, safe=False)
        except Sales.DoesNotExist:
            return JsonResponse({"message": "Sale does not exist"})

    else:
        try:
            content = json.loads(request.body)
            sale = Sales.objects.get(id=id)

            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(sale, encoder=SalesListEncoder, safe=False)
        except Sales.DoesNotExist:
            response = JsonResponse({"message": "Sales does not exist"})
            response.status = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerEncoder)
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Customer could not be created"}, status=400
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=id)
            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Sales person does not exist"}, status=400
            )
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sales_person(request, id):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales person does not exist"})
            response.status_code
            return response
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id=id)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Sales person does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.get(id=id)
            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(sales_person, prop, content[prop])
            sales_person.save()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales person does not exist"})
            response.status_code = 404
            return response
