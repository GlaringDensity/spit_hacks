import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="px-5 d-flex justify-content-between align-items-center navbar shadow-md sticky-top bg-white">
            <a class="navbar-brand" href="#">
                <img src="../src/assets/canteenlogo.png" alt="" style={{ height: "12%", width: "35%" }} />
            </a>
            <div className="ms-auto">
                <Link to="/signin" className="link text-black text-muted">
                    SignIn
                </Link>
                <Link to="/signup" className="link text-black text-muted">
                    SignUp
                </Link>
                <Link to="/signin" className="link text-black text-muted">
                    Home
                </Link>
                <Link to="/cart" className="link text-black text-muted">
                    Cart
                </Link>
                <Link to="/dashboard" className="link text-black text-muted">
                    Dashboard
                </Link>
                <Link to="/add-food" className="link text-black text-muted">
                    Add Item
                </Link>
                {/* <button className="link btn">
                    Logout
                </button> */}
            </div>
        </div>
    );
};

export default Navbar;