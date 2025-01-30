import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { InventorySalesRecord, deleteInventorySalesRecord } from "../api/invms";
import MonthlyRecord from "./MonthlyRecord";
import DailyRecord from "./DailyRecord";
import '../css/salesRecord.css'; 

const SalesRecord = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [sales, setSales] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [showDailySalesRecord, setShowDailySalesRecord] = useState(false);
    const [showMonthlySalesRecord, setShowMonthlySalesRecord] = useState(false);
    const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await InventorySalesRecord();
            if (response.data && response.data.users) {
                setSales(response.data.users);
                setFilteredSales(response.data.users);
            } else {
                throw new Error("Sales data not found");
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };


    const downloadSalesData = () => {
        const headers = [
            "Sale ID",
            "Date",
            "Item Name",
            "Quantity",
            "Total Price"
        ];

        const salesCSV = [headers.join(",")];

        filteredSales.forEach((sale) => {
            const row = [
                sale.sale_id,
                formatDate(sale.sale_date),
                sale.item_name,
                sale.stock_level,
                sale.total_price
            ];
            salesCSV.push(row.join(","));
        });

        const blob = new Blob([salesCSV.join("\n")], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "sales_record.csv");
    };

    const toggleDailySalesRecord = () => {
        setShowDailySalesRecord(!showDailySalesRecord);
        setShowMonthlySalesRecord(false);
    };

    const toggleMonthlySalesRecord = () => {
        setShowMonthlySalesRecord(!showMonthlySalesRecord);
        setShowDailySalesRecord(false);
    };

    const handleFilterChange = (e) => {
        setFilterDate(e.target.value);
    };

    const filterSalesByDate = () => {
        if (filterDate) {
            const filtered = sales.filter(sale => formatDate(sale.sale_date) === formatDate(filterDate));
            setFilteredSales(filtered);
        } else {
            setFilteredSales(sales);
        }
    };
    const handleRemove = async (saleDate) => {
        const confirmation = window.confirm("Are you sure you want to delete this daily sales record?");
        if (confirmation) {
            try {
                const { data } = await deleteInventorySalesRecord(saleDate);
                if (data.success) {
                    setSuccess(data.message);
                    setError("");
                    fetchData();
                } else {
                    setError(data.message);
                    setSuccess("");
                }
            } catch (error) {
                console.error("Error removing inventory sales record:", error);
                setError("Failed to delete inventory sales record");
                setSuccess("");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Sales Record</h2>

            <div className="input-group mb-4 filter-group">
                <input
                    type="date"
                    className="form-control filter-input"
                    value={filterDate}
                    onChange={handleFilterChange}
                />
                <button className="btn btn-primary filter-button" onClick={filterSalesByDate}>Filter</button>
            </div>

            <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "40px" }}>
                <table className="table mt-3 text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Date</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale, index) => (
                            <tr key={index}>
                                <td>{formatDate(sale.sale_date)}</td>
                                <td>{sale.item_name}</td>
                                <td>{sale.stock_level}</td>
                                <td>{sale.total_price}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(sale.sale_date)}>Remove</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center" style={{ marginBottom: "20px" }}>
                <button className="btn btn-download mr-2" onClick={downloadSalesData}>Download</button>
                <button className="btn btn-daily-record mr-2" onClick={toggleDailySalesRecord}>Daily Record</button>
                <button className="btn btn-monthly-record" onClick={toggleMonthlySalesRecord}>Monthly Record</button>
            </div>

            {showDailySalesRecord && <DailyRecord />}
            {showMonthlySalesRecord && <MonthlyRecord />}
        </div>
    );
};

export default SalesRecord;
