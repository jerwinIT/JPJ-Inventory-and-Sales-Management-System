import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

function Navbar() {
    const { isAuth } = useSelector((state) => state.auth);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to='/'>
                    <div>HOME</div>
                </NavLink>
            </div>

            {isAuth ? (
                <div className="navbar-links ">
                    {/* Group 1: Dashboard, Delete Account, Change Password */}
                    <div className="nav-group">
                        <NavLink to='/dashboard'>
                            <div>About</div>
                        </NavLink>
                        <NavLink to='/get-cred'>
                            <div>Account</div>
                        </NavLink>
                        {/* <NavLink to='/search-product'>
                            <div>Search</div>
                        </NavLink> */}
                       

            

                    </div>

                    {/* Group 2: Inventory, Sell Product */}
                    <div className="nav-group">
                        <NavLink to='/get-product'>
                            <div>Inventory</div>
                        </NavLink>

                        <NavLink to='/sell-product'>
                            <div>Sell Product</div>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="navbar-links">
                    <NavLink to='/login'>
                        <div>ADMIN</div>
                    </NavLink>
                    
                </div>
            )}
        </nav>
    );
}

export default Navbar;