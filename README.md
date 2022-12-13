# CarCar

Team:

* Person 1 - Victoria
* Person 2 - Abdoul
## Design

## Service microservice

Within the Service Microservice, we've created 3 Models: AutomobileVO, Technician, and Appointment. The data coming from AutomobileVO is polled from the Automobile model inside the Inventory microservice. This Microservice is supposed to keep track of scheduled appointments, technicians, and the history of appointments submitted. This microservice will also allow you to update the status of an appointment, and cancel an appointment if needed.

-There's a feature that creates a new technician using a React form. To add, we use employee_number and name.
-Feature to create a service appointment (React form):
    -Vin, Customer_name, date/time, technician, reason
- Feature to show the list of appointments created.
    - VIN, customer name, date/time of appointment, technician name, is appointment cancelled or has it been finished, does automobile have VIP status.
-Feature that list previous service appointments when the VIN has been searched for.
    Should show list of service appointments

-All added features should include a NavBar at the top of the page to get to the specific service.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Sales (Backend)
    Models:
            Salesperson
            AutomobileVO
            Customer
            Sales
    Views:
        Salesperson
            Create a new salesperson
            Update salesperson
            Delete salesperson
            List salesperson

        Customer
            Create a new customer
            Update customer
            Delete customer
            List customer

        Sales
            Create a new sales
            Update sales
            Delete sales
            List sales


Sales(Frontend)
    For sales frontend, we had to create javascript files and add them to the frontend of the application, so it can render the views that we wrote on the backend of the application.
