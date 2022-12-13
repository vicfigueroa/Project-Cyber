import { useState, useEffect } from 'react';



function ManufacturerList() {
    const [manufacturers, setManufacturer] = useState([])

    const getData = async () => {
        const resp = await fetch('http://localhost:8100/api/manufacturers/')
        const data = await resp.json()

        setManufacturer(data.manufacturers)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturers</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    );
}

export default ManufacturerList
