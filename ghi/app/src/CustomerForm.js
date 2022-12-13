import React from 'react';

class CustomerForm extends React.Component {
    state = {
        name: "",
        address: "",
        phone_number: "",
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ customer: data.customer });
        }
    }

    handleChangeInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            address: this.state.address,
            phone_number: this.state.phone_number,
        }

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const customerurl = await response.json();
            console.log(customerurl)

            this.setState({
                name: '',
                address: '',
                phone_number: '',
            });
        }


    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleChangeInput} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="customer">Customer name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.address} onChange={this.handleChangeInput} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="employee_number">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.phone_number} onChange={this.handleChangeInput} placeholder="phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerForm;
