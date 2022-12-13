import { useState, useEffect } from 'react';



function AutomobileList() {
    const [automobiles, setAutomobile] = useState([])

    const getData = async () => {
        const resp = await fetch('http://localhost:8100/api/automobiles/')
        const data = await resp.json()

        setAutomobile(data.autos)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map(automobile => {
                        return (
                            <tr key={automobile.id}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
}

export default AutomobileList
