import { useState, useEffect } from 'react';


const SalesList = () => {
    const [sales, setSales] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const url = 'http://localhost:8090/api/sales/';
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            } else {
                console.log("Error");
            }
        }

        loadData()

    }, [])

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales person</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Sales price</th>
                    </tr>
                </thead>
                <tbody>{
                    sales.map(sale => {
                        return (
                            <tr>
                                <td>{sale.sales_person.employee_name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.sales_price}</td>
                            </tr>
                        )
                    })}</tbody>
            </table>
        </div>
    )


}
export default SalesList;
