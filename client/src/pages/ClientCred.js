import React, { useState, useEffect } from "react";
import { CredList, deleteAccount } from "../api/auth";
import ChangePassword from "./changePassword";
import DeleteAccount from "./deleteAccount";
import Register from "./register";


const UserCredit = () => {
    const [credentials, setCreds] = useState([]);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await CredList();
            setCreds(response.data.users);
        } catch (error) {
            console.error("Error fetching credentials data:", error);
        }
    };

    const toggleShowChangePassword = () => {
        setShowChangePassword(!showChangePassword);
        setShowRegister(false);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowChangePassword(false);
    };

    const handleDeleteAccount = async (username) => {
        const confirmation = window.confirm(`Are you sure you want to delete the account for ${username}?`);
        
        if (confirmation) {
            try {
                await deleteAccount(username);
                setCreds(prevCredentials => prevCredentials.filter(cred => cred.username !== username));
            } catch (error) {
                console.error("Error removing account:", error);
            }
        }
    };


    return (
        <div className="container mt-5">
            <h3 className="text-center mb-3">ADMIN</h3>
            <div className="container mt-3">
                <div className="d-flex justify-content-center mb-3">
                    <button
                        className="btn btn-primary mr-3"
                        onClick={toggleShowChangePassword}
                    >
                        Change Password
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={toggleRegister}
                    >
                        Add Account
                    </button>
                </div>
                {showChangePassword && <ChangePassword />}
                {showRegister && <Register />}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-striped table-bordered mt-5">
                        <thead className="thead-dark">
                            <tr>
                                <th>Username</th>
                     
                                <th></th> {/* Empty header for delete button */}
                            </tr>
                        </thead>
                        <tbody>
                            {credentials.map((creds, index) => (
                                <tr key={index}>
                                    <td>{creds.username}</td>
                                   
                                    <td>
                                        <DeleteAccount
                                            username={creds.username}
                                            onDeleteAccount={handleDeleteAccount}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )





}

export default UserCredit;