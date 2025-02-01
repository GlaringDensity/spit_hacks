import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="about">
        <h2>About Us</h2>
        <p>
          Our canteen management system ensures a smooth and hassle-free dining experience. We offer a variety of delicious meals with an easy-to-use ordering system.
        </p>
      </div>
      <div className="header">
        <h2>Quick Links</h2>
        <p><a href="/menu">Menu</a></p>
        <p><a href="/order">Order Now</a></p>
        <p><a href="/about">About Us</a></p>
        <p><a href="/contact">Contact</a></p>
      </div>
      <div className="header">
        <h2>Follow Us</h2>
        <p><a href="https://www.facebook.com">Facebook</a></p>
        <p><a href="https://www.instagram.com">Instagram</a></p>
        <p><a href="https://www.twitter.com">Twitter</a></p>
        <p><a href="https://www.linkedin.com">LinkedIn</a></p>
      </div>
      <div className="contact-us">
        <h2>Contact Us</h2>
        <p>
          <b>Address:</b> Z-302, Some Random Street, Some Random City, Some Random Country, 0000000
        </p>
        <p>
          <b>Phone No:</b> +101010101
        </p>
        <p>
          <b>Email:</b> support@canteenmanagement.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
