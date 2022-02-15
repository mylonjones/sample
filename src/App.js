import React from 'react'
import { Routes, Route } from "react-router-dom";
import Nav from './components/nav'
import Home from './components/home'
import About from './components/about'
import More from './components/more'
import Contact from './components/contact'
import Footer from './components/footer'

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='more' element={<More />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
