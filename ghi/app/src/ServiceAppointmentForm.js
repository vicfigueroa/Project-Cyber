import React from 'react';

class ServiceAppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: '',
            vin: '',
            date_time: '',
            reason: '',
            technician: '',
            technicians: [],
            successCreate: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        this.setState({[event.target.id]: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;
        delete data.successCreate;

        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(fetchConfig);
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment)
            const cleared = {
                customer_name: '',
                vin: '',
                date_time: '',
                reason: '',
                technician: '',
                successCreate: true,
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians})
        };
    }

    render() {
        let successClassName = 'alert alert-success d-none mb-0 mt-5 text-center';
        let formClassName = '';
        if (this.state.successCreate) {
            successClassName = 'alert alert-success mb-0 mt-5 text-center';
            formClassName = 'd-none';
        }

        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="text-center shadow p-4 mt-4">
                        <h1>Make A Service Appointment</h1>
                        <form className={formClassName} id="create-appointment-form" onSubmit={this.handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                            onChange={this.handleInputChange} value={this.state.customer_name}
                            placeholder="customer_name" required type="text" name="customer_name" id="customer_name"
                            className="form-control"/>
                            <label htmlFor="customer_name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            onChange={this.handleInputChange} value={this.state.date_time}
                            placeholder="date_time" required type="datetime-local" name="date_time" id="date_time"
                            className="form-control"/>
                            <label htmlFor="date_time">Date & Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            onChange={this.handleInputChange} value={this.state.vin}
                            placeholder="vin" required type="text" maxLength="17"
                            name="vin" id="vin"
                            className="form-control"/>
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label">Reason For Appointment</label>
                            <textarea
                            onChange={this.handleInputChange} value={this.state.reason}
                            required type="text" name="reason" id="reason"
                            className="form-control" rows="2"></textarea>
                        </div>
                        <div className="mb-3">
                            <select
                            onChange={this.handleInputChange} value={this.state.technician}
                            required name="technician" id="technician" className="form-select">
                            <option value="">Choose A Technician</option>
                            {this.state.technicians.map(technician => {
                                    return (
                                        <option key={technician.employee_number} value={technician.employee_number}>
                                            {technician.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-success">Create</button>
                        </form>
                        <div className={successClassName} id="success-message">
                            Appointment has been scheduled.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ServiceAppointmentForm;
