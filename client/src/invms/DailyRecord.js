import React, { useState, useEffect } from "react";
import { getDailySalesRecord, DailySalesRecord, deleteDailySalesRecord } from "../api/invms";

const DailySalesRecordComponent = () => {
    const [targetDate, setTargetDate] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dailySalesData, setDailySalesData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await getDailySalesRecord();
            setDailySalesData(response.data.users);
        } catch (error) {
            console.error("Error fetching daily sales data:", error);
            setError("Failed to fetch daily sales data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleChange = (e) => {
        setTargetDate(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterDate(e.target.value);
    };

    const handleClearFilter = () => {
        setFilterDate("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await DailySalesRecord({ targetDate });
            setSuccess(response.data.message);
            setError("");
            fetchData();
        } catch (error) {
            console.error("Error generating daily sales record:", error);
            setError("Failed to generate daily sales record");
            setSuccess("");
        }
    };

    const handleRemove = async (record_date) => {
        const confirmation = window.confirm("Are you sure you want to delete this daily sales record?");
        if (confirmation) {
            try {
                const { data } = await deleteDailySalesRecord(record_date);
                if (data.success) {
                    setSuccess(data.message);
                    setError("");
                    fetchData();
                } else {
                    setError(data.message);
                    setSuccess("");
                }
            } catch (error) {
                console.error("Error removing daily sales record:", error);
                setError("Failed to delete daily sales record");
                setSuccess("");
            }
        }
    };

    const filteredSalesData = filterDate 
        ? dailySalesData.filter(dsales => formatDate(dsales.record_date) === formatDate(filterDate))
        : dailySalesData;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Daily Record</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <label htmlFor="targetDate" className="form-label">Select Date:</label>
                        <input
                            id="targetDate"
                            type="date"
                            value={targetDate}
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

            <div className="row justify-content-center mb-4">
                <div className="col-md-4">
                    <label htmlFor="filterDate" className="form-label">Filter date:</label>
                    <input
                        id="filterDate"
                        type="date"
                        value={filterDate}
                        onChange={handleFilterChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button onClick={handleClearFilter} className="btn btn-secondary btn-sm">Clear</button>
                </div>
            </div>

            {error && <p className="alert alert-danger">{error}</p>}
            {success && <p className="alert alert-success">{success}</p>}
            
            <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "600px" }}>
                <table className="table mt-2 text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Record Date</th>
                            <th>Total Sales</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalesData.map((dsales, index) => (
                            <tr key={index}>
                                <td>{formatDate(dsales.record_date)}</td>
                                <td>{dsales.total_sales}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(dsales.record_date)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default DailySalesRecordComponent;
