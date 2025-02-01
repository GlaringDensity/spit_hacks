import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Chatbot from './component/Chatbot';
import Home from './component/Home';



function App() {

  return (
    <>
   
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/chatbot" element={<Chatbot />}></Route>
      </Routes>
    </>
  )
}

export default App
