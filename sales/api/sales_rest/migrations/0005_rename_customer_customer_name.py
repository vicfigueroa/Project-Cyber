# Generated by Django 4.0.3 on 2022-12-08 02:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_rename_sales_person_salesperson_employee_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='customer',
            new_name='name',
        ),
    ]
