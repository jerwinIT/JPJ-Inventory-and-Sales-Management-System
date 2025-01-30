import React, { useState } from "react";

const DeleteAccount = ({ username, onDeleteAccount }) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await onDeleteAccount(username);
            setSuccess("Account removed successfully");
            setError('');
        } catch (error) {
            console.error("Error removing account:", error);
            setError("Account Not Found");
            setSuccess('');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <button type='submit' className='btn btn-danger'>
                    Remove
                </button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
        </div>
    );
};

export default DeleteAccount;
