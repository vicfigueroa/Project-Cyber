import React from "react";

class ManufacterurForm extends React.Component {
    state = {
        name: "",
    };

    handleEventChange = (event) => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formUrl = "http://localhost:8100/api/manufacturers/";
        const data = {
            name: this.state.name,
        };
        const formData = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(formUrl, formData).then((response) => {
            if (response.ok) {
                this.setState({ name: "" });
            }
        });
    };

    render() {
        return (
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center mb-5">Add a Manufacturer</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleEventChange} value={this.state.name} required placeholder="Manufacturers" type="text" className="form-control" id="manufacturer" />
                            <label htmlFor="manufacturer">Manufacturer's Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ManufacterurForm;
