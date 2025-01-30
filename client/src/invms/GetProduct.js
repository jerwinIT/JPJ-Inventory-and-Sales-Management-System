import React, { useState, useEffect } from "react";
import { removeProduct, getProduct, searchProduct } from "../api/invms";
import Layout from "../components/layout";
import AddProduct from "./AddProduct";
import UpdatePrice from "./UpdatePrice";
import UpdateStock from "./UpdateStock";
import { saveAs } from "file-saver";
import "../css/Getproduct.css"

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showUpdatePrice, setShowUpdatePrice] = useState(false);
    const [showUpdateStock, setShowUpdateStock] = useState(false);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const onChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await searchProduct({ item_name: searchInput });
            setSearchResult(response.data.products);
            setError("");
        } catch (error) {
            setError("Invalid Product");
            setSearchResult([]);
        }
    };

    const handleRemove = async (itemNumber) => {
        const confirmation = window.confirm("Are you sure you want to remove this product?");
        
        if (confirmation) {
            try {
                const { data } = await removeProduct(itemNumber);
    
                if (data.success) {
                    setSuccess(data.message);
                    setError('');
                    setProducts(prevProducts => prevProducts.filter(product => product.item_number !== itemNumber));
                    setSearchResult(prevSearchResult => prevSearchResult.filter(product => product.item_number !== itemNumber));
                } else {
                    setError(data.error);
                    setSuccess('');
                }
            } catch (error) {
                console.error("Error removing product:", error);
                setError("Product Not Found");
                setSuccess('');
            }
        }
    };

    const toggleAddProduct = () => {
        setShowAddProduct(!showAddProduct);
        setShowUpdatePrice(false);
        setShowUpdateStock(false);
    };

    const toggleUpdatePrice = () => {
        setShowUpdatePrice(!showUpdatePrice);
        setShowAddProduct(false);
        setShowUpdateStock(false);
    };

    const toggleUpdateStock = () => {
        setShowUpdateStock(!showUpdateStock);
        setShowAddProduct(false);
        setShowUpdatePrice(false);
    };

    const downloadInventoryData = (data) => {
        const headers = [
            "Item Number",
            "Item Name",
            "Price",
            "Product Line MMI ID",
            "Motor ID",
            "Stock Level",
            "Reorder Point",
            "Ceiling Level",
            "Floor Level"
        ];

        const inventoryText = [headers.join(",")];

        data.forEach((item, index) => {
            const row = [
                item.item_number,
                item.item_name,
                item.price,
                item.product_line_mmi_id_fk,
                item.motor_id_fk,
                item.stock_level,
                item.reorder_point,
                item.ceiling_level,
                item.floor_level
            ];
            inventoryText.push(row.join(","));
        });

        const blob = new Blob([inventoryText.join("\n")], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "inventory_data.csv");
    };

    return (
        <div className="inventory-background">
        <Layout>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Inventory Management</h1>
                <form onSubmit={onSubmit} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Item"
                            value={searchInput}
                            onChange={onChange}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <div className="button-group mb-3">
                        <div>
                            <button className="btn btn-add-product mr-3" onClick={toggleAddProduct}>
                                    Add Product
                                </button>
                                <button className="btn btn-update-price mr-3" onClick={toggleUpdatePrice}>
                                    Update Price
                                </button>
                                <button className="btn btn-update-stock mr-3" onClick={toggleUpdateStock}>
                                    Update Stock
                                </button>
                                <button
                                    className="btn btn-download-record"
                                    onClick={() => downloadInventoryData(searchResult.length > 0 ? searchResult : products)}
                                >
                                    Download
                            </button>
                        </div>
                    <div>
                        {showAddProduct && <AddProduct />}
                        {showUpdatePrice && <UpdatePrice />}
                        {showUpdateStock && <UpdateStock />}
                    </div>
                </div>
                <div className="table-container" style={{ maxHeight: "600px", overflowY: "auto", marginBottom: "300px" }}>
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
                                <th>Actions</th>
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
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleRemove(product.item_number)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
               
            </div>
        </Layout>
        </div>
    );
};

export default Inventory;
