import React, { useState } from "react";
import Layout from "../components/layout";
import UserCred from "./UserCred";
import ClientCred from "./ClientCred";
import '../css/account.css'; 

const Account = () => {
  const [showUserCredit, setShowUserCredit] = useState(false);
  const [showClientCredit, setShowClientCredit] = useState(false);

  const toggleUserCredit = () => {
    setShowUserCredit(!showUserCredit);
    setShowClientCredit(false);
  };
  const toggleClientCredit = () => {
    setShowClientCredit(!showClientCredit);
    setShowUserCredit(false);
  };

  return (

    <Layout>
    <div className="account-page">
      <div className="container mt-5 account-container">
        <h1 className="text-center mb-4">Account Management</h1>
        <div className="user-client-button">
          <button
            className="btn btn-primary"
            onClick={toggleUserCredit}
          >
            {showUserCredit ? "Hide User" : "User"}
          </button>
          <button
            className="btn btn-primary"
            onClick={toggleClientCredit}
          >
            {showClientCredit ? "Hide Client" : "Client"}
          </button>
        </div>
        {showUserCredit && <UserCred />}
        {showClientCredit && <ClientCred />}
      </div>
    </div>  
  </Layout>
   
  );
};

export default Account;
