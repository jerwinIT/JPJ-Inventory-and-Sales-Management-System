import React, { useState, useEffect } from "react";
import { InventorySalesRecord } from "../api/invms";
import '../css/salesRecord.css'; 

const SalesRecord = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await InventorySalesRecord();
            if (response.data && response.data.users) {
                setSales(response.data.users);
            } else {
                throw new Error("Sales data not found");
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Sales Record</h2>

            <div className="sales-table-container">
                <table className="table mt-3 text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => (
                            <tr key={index}>
                                <td>{formatDate(sale.sale_date)}</td>
                                <td>{sale.item_name}</td>
                                <td>{sale.stock_level}</td>
                                <td>{sale.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesRecord;
