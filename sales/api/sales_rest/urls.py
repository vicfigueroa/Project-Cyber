from django.urls import path
from .views import (
    api_list_sales,
    api_list_sales_people,
    api_list_customers,
    api_show_sales_person,
    api_show_sale,
    api_show_customer,
)

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sale/<int:id>/", api_show_sale, name="api_show_sales"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customer/<int:id>/", api_show_customer, name="api_show_customer"),
    path("sales_people/", api_list_sales_people, name="api_list_sales_people"),
    path("sales_person/<int:id>/", api_show_sales_person, name="api_show_sales_person"),
]
