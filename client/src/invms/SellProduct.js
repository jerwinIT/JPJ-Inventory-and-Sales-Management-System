import React, { useState } from "react";
import { sellProduct, InventorySalesRecord } from "../api/invms";
import Layout from "../components/layout";
import SalesRecord from "./SalesRecord";
import InventoryTable from "./InventoryTable";
import '../css/sellproduct.css'; 

const SellProduct = () => {
    const [showSalesRecord, setShowSalesRecord] = useState(false);
    const [showInventoryTable, setShowInventoryTable] = useState(false);
    const [sellData, setSellData] = useState({
        item_name: "",
        stock_level: 0
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [sales, setSales] = useState([]);

    const onChange = (e) => {
        setSellData({ ...sellData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sellProduct(sellData);
            setSuccess(response.data.message);
            setError("");
            setSellData({
                item_name: "",
                stock_level: 0
            });
            fetchData();
            
        } catch (error) {
            setError("Transaction Error");
            setSuccess("");
        }
    };

    const fetchData = async () => {
        try {
            const response = await InventorySalesRecord();
            if (response.data && response.data.users) {
                setSales(response.data.users);
            } else {
                throw new Error("Sales data not found");
            }
            setError("");
        } catch (error) {
            console.error("Error fetching sales data:", error);
            setError("Error fetching sales data");
        }
    };

    const toggleSalesRecord = () => {
        setShowSalesRecord(!showSalesRecord);
        setShowInventoryTable(false); // Close Inventory Table when Sales Record is toggled
    };

    const toggleInventoryTable = () => {
        setShowInventoryTable(!showInventoryTable);
        setShowSalesRecord(false); // Close Sales Record when Inventory Table is toggled
    };

    return (
        <div className="sellproduct-background">
        <Layout>
            <div className="container mt-5">
                <h1 className="text-center">Sell Product</h1>
                <form onSubmit={onSubmit} className="mt-5">
                    <div className="d-flex justify-content-center">
                        <div className="form-group">
                            <label>Item Name:</label>
                            <input
                                type="text"
                                name="item_name"
                                value={sellData.item_name}
                                onChange={onChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group ml-3">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="stock_level"
                                value={sellData.stock_level}
                                onChange={onChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div style={{ marginTop: '30px', marginLeft: '10px' }}>
                            <button type='submit' className='btn btn-primary'>
                                Sell
                            </button>
                        </div>
                    </div>
                </form>
                <div className="text-center">
                    {error && <p className="text-danger mt-3">{error}</p>}
                    {success && <p className="text-success mt-3">{success}</p>}
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-auto">
                        <button className="btn btn-sales-record mr-3" onClick={toggleSalesRecord}>
                            Sales Record
                        </button>
                        <button className="btn btn-inventory-table" onClick={toggleInventoryTable}>
                                    Inventory Table
                                </button>
                    </div>
                </div>
                {showSalesRecord && <SalesRecord />}
                {showInventoryTable && <InventoryTable />}
            </div>
        </Layout>
        </div>
    );
};

export default SellProduct;
