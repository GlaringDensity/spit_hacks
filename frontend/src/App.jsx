import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.jsx';
import Chatbot from './component/Chatbot.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';



function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path="/chatbot" element={<Chatbot />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
