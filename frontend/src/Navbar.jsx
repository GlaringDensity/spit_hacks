import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="temporary px-5  d-flex justify-content-between align-items-center navbar shadow-md sticky-top bg-white">
            <a class="navbar-brand" href="#">
                <img src="../src/assets/canteenlogo.png" alt="" style={{ height: "12%", width: "35%" }} />
            </a>
            <div className="ms-auto">
               
               
                <Link to="/Home" className="link text-black links">
                    Home
                </Link>
                <Link to="/addtocart" className="link text-black">
                    Canteen
                </Link>
                <a id="i" style={{color: "black"}} href="http://127.0.0.1:5500/frontend/src/pages/adminDashboard/admin.html" className="dashboard">Dashboard</a>
                
                <Link to="/signin" className="link text-black">
                    SignIn/Signup
                </Link>
                {/* <button className="link btn">
                    Logout
                </button> */}
            </div>
        </div>
    );
};

export default Navbar;