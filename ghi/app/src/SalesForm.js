import { useState, useEffect } from 'react';

const initialData = {
    "automobile": "",
    "sales_person": "",
    "customer": "",
    "sales_price": "",
}

const SalesForm = () => {
    const [formData, setFormData] = useState(initialData);
    const [vins, setVinData] = useState([]);
    const [salesPeople, setSalesPersonData] = useState([])
    const [customers, setCustomersData] = useState([])

    const getVin = async () => {
        const url = await fetch('http://localhost:8100/api/automobiles/')
        const data = await url.json()
        setVinData(data.autos)
    }

    const getSalesPerson = async () => {
        const url = await fetch('http://localhost:8090/api/sales_people/')
        const data = await url.json()
        setSalesPersonData(data.sales_person)
    }

    const getCustomers = async () => {
        const url = await fetch('http://localhost:8090/api/customers/')
        const data = await url.json()
        setCustomersData(data.customers)
    }

    useEffect(() => {
        getVin();
        getSalesPerson();
        getCustomers();
    }, [])

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8090/api/sales/';
        const autoUrl = await fetch(`http://localhost:8100/api/automobiles/${formData.vin}`, { method: 'DELETE' });

        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const resp = await fetch(url, fetchOptions);
        if (resp.ok) {
            setFormData(initialData);
        }
        else {
            console.log(resp.status);
        }
        getVin();
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="mb-3">
                            <select value={formData.vin} onChange={handleInputChange} required name="vin" id="vin" className="form-select">
                                <option value="">Choose a vin</option>
                                {vins.map(vin => {
                                    return (
                                        <option key={vin.vin} value={vin.vin}>
                                            {vin.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={formData.sales_person} onChange={handleInputChange} required name="sales_person" id="sales_person" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salesPeople?.map(sales_person => {
                                    return (
                                        <option key={sales_person.employee_number} value={sales_person.id} >
                                            {sales_person.employee_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={formData.customer} onChange={handleInputChange} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleInputChange} value={formData.sales_price} placeholder="Price" required type="text" name="sales_price" id="sales_price" className="form-control" />
                            <label htmlFor='sales_price'>Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default SalesForm
