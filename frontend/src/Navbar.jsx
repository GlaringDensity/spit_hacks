import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";

const Navbar = () => {

    useEffect(() => {
        const navbar = document.querySelector("#scrollAnime");

        const handleScroll = () => {
            if (window.scrollY > 0) {
                navbar.classList.remove("rounded-pill", "mx-1", "my-2");
            } else {
                navbar.classList.add("rounded-pill", "mx-1", "my-2");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className="temporary px-5  d-flex justify-content-between align-items-center navbar shadow-md sticky-top bg-white rounded-pill pt-4 pb-5 px-1 mx-1 my-2" id="scrollAnime">
            <a className="navbar-brand" href="#">
                <img src="../src/assets/canteenlogo.png" alt="" style={{ height: "12%", width: "35%" }} />
            </a>
            <div className="ms-auto">
                <Link to="/Home" className="link text-black links">
                    Home
                </Link>
                <Link to="/addtocart" className="link text-black">
                    Canteen
                </Link>
                <Link to="/Chatbot" className="link text-black links" id="chatbot">
                    ChatBot
                </Link>
                <a id="i" style={{ color: "black" }} href="file:///Users/atharvapramodjadhav/Documents/SpitHacks/spit_hacks/frontend/src/pages/adminDashboard/admin.html" className="dashboard">Dashboard</a>
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