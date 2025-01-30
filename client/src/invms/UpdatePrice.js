import React, { useState } from "react";
import { updatePrice } from "../api/invms";

const UpdatePrice = () => {
    const [values, setValues] = useState({
        item_name: "",
        new_price: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await updatePrice(values);
            setSuccess(response.data.message);
            setError("");
            setValues({
                item_name: "",
                new_price: ""
            });
            window.location.reload();
        } catch (error) {
            setError("Invalid");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    const handleReload = () => {
        setSuccess(""); // Clear success message
        setError(""); // Clear error message
        setValues({
            item_name: "",
            new_price: ""
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mt-3">Update Price</h2>
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
                            <label htmlFor="new_price">New Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="new_price"
                                name="new_price"
                                value={values.new_price}
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
            {loading && <p className="text-center mt-3">Loading...</p>}
            {error && <p className="text-danger mt-3 text-center">{error}</p>}
            {success && <p className="text-success mt-3 text-center">{success}</p>}
           
        </div>
    );
};

export default UpdatePrice;
