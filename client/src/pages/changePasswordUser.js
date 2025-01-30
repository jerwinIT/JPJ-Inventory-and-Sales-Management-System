import React, { useState } from "react";
import { changePasswordUser } from "../api/auth";

const ChangePassword = () => {
    const [values, setValues] = useState({
        username: '',
        oldPassword: '',
        newPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await changePasswordUser(values);
            console.log("Change Password Response:", response); // Log the response
            if (response.data.success) {
                setSuccess(response.data.message);
                setError('');
                // Fetch data after changing password successfully
                fetchData();
            } else {
                setError(response.data.error || "Error changing password");
                setSuccess('');
            }
            // Clear the input fields after submission
            setValues({ username: '', oldPassword: '', newPassword: '' });
        } catch (error) {
            console.error("Error changing password:", error);
            setError("Error changing password");
            setSuccess('');
        }
    };

    // Define the fetchData function to fetch data if needed
    const fetchData = async () => {
        // Implement your fetching logic here
    };

    return (
      
            <div className="container mt-5">
                <h3 className="text-center">Change Password</h3>
                <form onSubmit={onSubmit}>
                    <div className="d-flex justify-content-center">
                        <div className="form-group mr-3">
                            <label>Username:</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder='Enter username'
                                name="username"
                                value={values.username}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group mr-3">
                            <label>Old Password:</label>
                            <div className="input-group">
                                <input 
                                    type={showOldPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder='Enter old password'
                                    name="oldPassword"
                                    value={values.oldPassword}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                <button
                                        className='btn btn-outline-secondary' // Removed 'text-white' class
                                        style={{ color: 'white', backgroundColor: 'black' }} // Added inline style to set button color
                                        type='button'
                                        onClick={toggleShowOldPassword}
                                        >
                                        <span style={{ color: 'white' }}>{showOldPassword ? 'Hide' : 'Show'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>New Password:</label>
                            <div className="input-group">
                                <input 
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder='Enter new password'
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                <button
                                        className='btn btn-outline-secondary' // Removed 'text-white' class
                                        style={{ color: 'white', backgroundColor: 'black' }} // Added inline style to set button color
                                        type='button'
                                        onClick={toggleShowOldPassword}
                                        >
                                        <span style={{ color: 'white' }}>{showOldPassword ? 'Hide' : 'Show'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '30px', marginLeft: '10px' }}>
                            <button type='submit' className='btn btn-primary'>
                                Done
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-danger mt-3">{error}</p>}
                    {success && <p className="text-success mt-3">{success}</p>}
                </form>
            </div>
      
    );
};

export default ChangePassword;
