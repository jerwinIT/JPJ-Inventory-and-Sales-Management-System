import React, { useState, useEffect } from "react";
import { searchProduct, getProduct } from "../api/invms";


const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getProduct();
            setProducts(response.data.users);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await searchProduct({ item_name: searchInput });
            setSearchResult(response.data.products);
            setError("");
            setSuccess("");
        } catch (error) {
            setError("Invalid Product");
            setSearchResult([]);
        }
    };

    return (
     
            <div className="container mt-5">
                <h1 className="text-center mb-4">Inventory</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Item"
                            value={searchInput}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}

                <div style={{ maxHeight: "500px", overflowY: "auto", marginBottom: "600px" }}>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Item Number</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Product Line MMI ID</th>
                                <th>Motor ID</th>
                                <th>Stock Level</th>
                                <th>Reorder Point</th>
                                <th>Ceiling Level</th>
                                <th>Floor Level</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResult.length > 0 ? searchResult : products).map((product, index) => (
                                <tr key={index}>
                                    <td>{product.item_number}</td>
                                    <td>{product.item_name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.product_line_mmi_id_fk}</td>
                                    <td>{product.motor_id_fk}</td>
                                    <td>{product.stock_level}</td>
                                    <td>{product.reorder_point}</td>
                                    <td>{product.ceiling_level}</td>
                                    <td>{product.floor_level}</td>
                                 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

    );
};

export default SearchProduct;
