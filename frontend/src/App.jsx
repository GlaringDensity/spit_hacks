import { useState } from 'react'
import AOS, { init } from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.jsx';
import Chatbot from './component/Chatbot.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import SignInPage from './pages/login_signup/SignInPage.jsx';
import SignUpPage from './pages/login_signup/SignUpPage.jsx';
import AddToCart from './pages/addtocart/addtocart.jsx';




function App() {

  useEffect(() => {
    AOS.init({
      duration: 2100,
      easing: "ease-in-out",
    })
  }
    , []);


  return (
    <>
      
      <Navbar></Navbar>
      
      <Routes>
        <Route path='/Home' element={<HomePage />}></Route>
        <Route path="/chatbot" element={<Chatbot />}></Route>
        <Route path="/addtocart" element={<AddToCart />}></Route>
       <Route path="/signin" element={<SignUpPage/>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
