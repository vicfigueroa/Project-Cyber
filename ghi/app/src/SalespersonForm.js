import React from 'react';

class SalesPersonForm extends React.Component {
    state = {
        employee_name: "",
        employee_number: "",
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales_people/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ employee_name: data.employee_number });
        }
    }

    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            employee_name: this.state.employee_name,
            employee_number: this.state.employee_number,
        }

        const sales_person_url = 'http://localhost:8090/api/sales_people/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(sales_person_url, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson)

            this.setState({
                employee_name: '',
                employee_number: '',
            });
        }


    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Sales Person</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-person">
                            <div className="form-floating mb-3">
                                <input defaultValue={this.state.employee_name} onChange={this.handleChangeInput} placeholder="employee_name" required type="text" name="employee_name" id="employee_name" className="form-control" />
                                <label htmlFor="employee_name">Employee name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input defaultValue={this.state.employee_number} onChange={this.handleChangeInput} placeholder="employee_number" required type="text" name="employee_number" id="employee_number" className="form-control" />
                                <label htmlFor="employee_number">Employee #</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesPersonForm
