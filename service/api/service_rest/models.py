from django.db import models

# Create your models here.

# Enter Technician, tech name an employer number

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, null=True)


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

# Enter Service Appointent, vin, who owns vehicle, date/time of app,
# reason for service, technician

class Appointment(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=200)
    date_time = models.DateTimeField()
    reason = models.TextField()
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        null=True,
        on_delete=models.CASCADE
    )
    vip = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
