import React, { useState } from "react";
import { updateStock } from "../api/invms";

const UpdateStock = () => {
    const [values, setValues] = useState({
        item_name: "",
        stock_level: 0
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateStock(values);
            setSuccess(response.data.message);
            setError("");
            setValues({
                item_name: "",
                stock_level: 0
            });
            window.location.reload();
        } catch (error) {
            setError("Invalid");
            setSuccess("");
        }
    };

    const handleReload = () => {
        setSuccess(""); // Clear success message
        setError(""); // Clear error message
        setValues({
            item_name: "",
            stock_level: ""
        });
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center mt-3">Update Stock</h2>
            <form onSubmit={onSubmit}>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="item_name">Item Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="item_name"
                                name="item_name"
                                value={values.item_name}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="stock_level">New Stock Level:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock_level"
                                name="stock_level"
                                value={values.stock_level}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mr-2">Done</button>
                    <button className="btn btn-secondary" onClick={handleReload}>Clear</button>
                </div>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
        </div>
    );
};

export default UpdateStock;
