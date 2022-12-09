from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "color",
        "year",
        "vin",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        'vin',
        'owner',
        'date',
        'reason',
        'technician',
        'vip',
        'finished'
    ]
    encoders ={
        "technician": TechnicianEncoder(),
    }
