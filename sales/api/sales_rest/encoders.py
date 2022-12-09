from common.json import ModelEncoder
from .models import (
    SalesPerson,
    Customer,
    AutomobileVO,
    Sales,
)


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "employee_name",
        "employee_number",
        "id",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "href",
        "color",
        "year",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]


class SalesListEncoder(ModelEncoder):
    model = Sales
    properties = ["automobile", "sales_person", "customer", "sales_price"]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
