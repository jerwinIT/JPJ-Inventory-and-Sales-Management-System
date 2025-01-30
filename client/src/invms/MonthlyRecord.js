import React, { useState, useEffect } from "react";
import { MonthlySalesRecord, getMonthlySalesRecord, deleteMonthlySalesRecord } from "../api/invms";

const MonthlySalesRecordComponent = () => {
    const [monthlySalesData, setMonthlySalesData] = useState([]);
    const [monthlyRecordData, setMonthlyRecordData] = useState({
        startDate: "",
        endDate: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setMonthlyRecordData({ ...monthlyRecordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await MonthlySalesRecord(monthlyRecordData);
            setSuccess(response.data.message);
            setError("");
            fetchData();
        } catch (error) {
            setError("An error occurred while generating monthly records.");
            setSuccess("");
        }
    };

    const fetchData = async () => {
        try {
            const response = await getMonthlySalesRecord();
            setMonthlySalesData(response.data.users);
        } catch (error) {
            console.error("Error fetching monthly sales data:", error);
            setError("Failed to fetch monthly sales data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleRemove = async (startDate, endDate) => {
        const confirmation = window.confirm("Are you sure you want to delete this monthly sales record?");
        if (confirmation) {
            try {
                const { data } = await deleteMonthlySalesRecord(startDate, endDate);
                if (data.success) {
                    setSuccess(data.message);
                    setError("");
                    fetchData();
                } else {
                    setError(data.message);
                    setSuccess("");
                }
            } catch (error) {
                console.error("Error removing monthly sales record:", error);
                setError("Failed to delete monthly sales record");
                setSuccess("");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Monthly Record</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <label htmlFor="startDate" className="form-label">Start Date:</label>
                        <input
                            id="startDate"
                            type="date"
                            name="startDate"
                            value={monthlyRecordData.startDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="endDate" className="form-label">End Date:</label>
                        <input
                            id="endDate"
                            type="date"
                            name="endDate"
                            value={monthlyRecordData.endDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary btn-sm">Generate</button>
                    </div>
                </div>
            </form>

            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}
            
            <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto" ,marginBottom: "600px" }}>
                <table className="table mt-5 text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total Sales</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlySalesData.map((msales, index) => (
                            <tr key={index}>
                                <td>{formatDate(msales.start_date)}</td>
                                <td>{formatDate(msales.end_date)}</td>
                                <td>{msales.total_sales}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(msales.start_date, msales.end_date)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MonthlySalesRecordComponent;
