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
                        

            

                    </div>
                    <div className="nav-group">
                        <NavLink to='/sell-product'>
                            <div>Sell Product</div>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="navbar-links">
                    <NavLink to='/login'>
                        <div>FRONT DESK</div>
                    </NavLink>
                    
                </div>
            )}
        </nav>
    );
}

export default Navbar;