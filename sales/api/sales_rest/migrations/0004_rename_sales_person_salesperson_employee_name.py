# Generated by Django 4.0.3 on 2022-12-07 21:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0003_rename_name_customer_customer_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salesperson',
            old_name='sales_person',
            new_name='employee_name',
        ),
    ]
