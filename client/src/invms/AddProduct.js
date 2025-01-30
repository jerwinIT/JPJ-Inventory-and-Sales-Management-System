import React, { useState } from "react";
import { addProduct } from "../api/invms";

const AddProduct = () => {
    const [values, setValues] = useState({
        item_name: '', 
        price: '', 
        product_line_mmi_id_fk: '', 
        motor_id_fk: '',
        stock_level: '',
        reorder_point: '',
        ceiling_level: '',
        floor_level: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await addProduct(values);
            setError('');
            setSuccess(data.message);
            setValues({ 
                item_name: '', 
                price: '', 
                product_line_mmi_id_fk: '', 
                motor_id_fk: '',
                stock_level: '',
                reorder_point: '',
                ceiling_level: '',
                floor_level: '' 
            });
            window.location.reload();
        } catch (error) {
            if (error.response?.data?.errors?.length > 0) {
                setError(error.response.data.errors[0].msg);
            } else {
                setError("Error adding new product");
            }
            setSuccess('');
        }
    };
    //clearing
    const handleReload = () => {
        setSuccess(""); 
        setError(""); 
        setValues({
            item_name: '', 
            price: '', 
                product_line_mmi_id_fk: '', 
                motor_id_fk: '',
                stock_level: '',
                reorder_point: '',
                ceiling_level: '',
                floor_level: '' 
        });
    };

    return (  
        
            <div className="container mt-5">
                <h3 className="text-center mt-3">Add product</h3> 
                <form onSubmit={(e) => onSubmit(e)} className="mt-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <h6 className="small-font">Item Name</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="item_name" 
                                    value={values.item_name} 
                                    onChange={(e) => setValues({...values, item_name: e.target.value })}
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h6 className="small-font">Price</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="price" 
                                    value={values.price} 
                                    onChange={(e) => setValues({...values, price: e.target.value })}
                                    placeholder="Enter the price"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h6 className="small-font">Product Line</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="product_line_mmi_id_fk" 
                                    value={values.product_line_mmi_id_fk} 
                                    onChange={(e) => setValues({...values, product_line_mmi_id_fk: e.target.value })}
                                    placeholder="Enter product line"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h6 className="small-font">Motor Id</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="motor_id_fk" 
                                    value={values.motor_id_fk} 
                                    onChange={(e) => setValues({...values, motor_id_fk: e.target.value })}
                                    placeholder="Enter motor id"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <h6 className="small-font">Stock</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="stock_level" 
                                    value={values.stock_level} 
                                    onChange={(e) => setValues({...values, stock_level: e.target.value })}
                                    placeholder="Enter stock level"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h6 className="small-font">Reorder Point</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="reorder_point" 
                                    value={values.reorder_point} 
                                    onChange={(e) => setValues({...values, reorder_point: e.target.value })}
                                    placeholder="Enter reorder point"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h6 className="small-font">Ceiling Level</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="ceiling_level" 
                                    value={values.ceiling_level} 
                                    onChange={(e) => setValues({...values, ceiling_level: e.target.value })}
                                    placeholder="Enter ceiling level"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <h6 className="small-font">Floor Level</h6>
                                <input 
                                    type="text" 
                                    className="form-control small-font"
                                    name="floor_level" 
                                    value={values.floor_level} 
                                    onChange={(e) => setValues({...values, floor_level: e.target.value })}
                                    placeholder="Enter floor level"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {/* Display error message */}
                    {error && <div className="error-message small-font">{error}</div>}
                    {/* Display success message */}
                    {success && <div className="success-message small-font">{success}</div>}
                    <div className="mt-3 d-flex align-items-center">
                        <button type='submit' className='btn btn-primary small-font mr-3'>Add</button>
                        <button className="btn btn-secondary" onClick={handleReload}>Clear</button>
                    </div>
                                    
                    
                    
                </form>
            </div> 
       
    );
}

export default AddProduct;
