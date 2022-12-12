from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import AutomobileVOEncoder, TechnicianEncoder, AppointmentListEncoder
# Create your views here.

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()

        return JsonResponse(
            {"technicians":technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "No technician created"},
                status = 400
            )
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_technicians(request, pk):
    if request.method == "GET":
            try:
                technicians = Technician.objects.get(id=pk)
                return JsonResponse(
                    technicians,
                    encoder=TechnicianEncoder,
                    safe=False,
                )
            except Technician.DoesNotExist:
                return JsonResponse({"message": "Does not exist"},
                status=404, )

    elif request.method == "DELETE":
        try:
            technicians = Technician.objects.get(id=pk)
            technicians.delete()
            return JsonResponse(
                technicians,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    print("here")
    if request.method == "GET":
        appointment = Appointment.objects.all()
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentListEncoder,
        )
    else:
        print("here 1")
        content = json.loads(request.body)
        try:
            print("here 2")

            employee_number = content["technician"]
            technician = Technician.objects.get(employee_number=employee_number)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"error": "This employee does not exist, try again"},
                status=422,
            )
        try:
            print("here 3")
            appointment = Appointment.objects.create(**content)
            print(appointment)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_appointments(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        response = JsonResponse({"message": "Appointment does not exist"})
        response.status_code = 404
        return response



    if request.method == "GET":
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )

    else:
        appointment.delete()
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False
        )
