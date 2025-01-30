import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProtectedInfo, onLogout } from '../api/auth';
import Layout from '../components/layout';
import { unauthenticateUser } from '../redux/slices/authSlice';
import '../css/dashboard.css'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div className="dashboard-background">
      <Layout>
        <h1 className="welcome-heading">WELCOME USER!</h1>
        <div className="intro-text">
          <p>We, Jerwin Louise G. Peria, Gea M. Cuevas, and Riana Herlaine Carandang, students from BSIT 2202, 2nd Year, are thrilled to introduce "Gear Up," a local web application designed to transform the operations of JPJ Motorparts and Accessories. Our primary goal with "Gear Up" is to shift the shop from a paper-based system to a digital platform for sales and inventory management.</p>
          <p>A key feature of "Gear Up" is its user authorization interface, ensuring that only authorized personnel can execute sales transactions. This system is designed to exclusively offer products available in our database, enhancing accuracy and preventing overselling.</p>
          <p>By providing real-time inventory data and restricting sales to available products, "Gear Up" aims to streamline operations for JPJ Motorparts and Accessories, facilitating smoother transactions and improving overall efficiency. We are committed to leveraging our expertise in web development to deliver a reliable solution tailored to the shop's needs, marking a significant step towards modernization and growth within the local business community.</p>
        </div>
        <h2>{protectedData}</h2>

        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
      </Layout>
    </div>
  );
};

export default Dashboard;
