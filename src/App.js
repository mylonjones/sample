import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import Nav from './components/nav'
import Home from './components/home'
import Diet from './components/diet'
import More from './components/more'
import Exercise from './components/exercise'
import Footer from './components/footer'
import Consultations from './components/consultations'

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='diet' element={<Diet />} />
          <Route path='exercise' element={<Exercise />} />
          <Route path='more' element={<More />} />
          <Route path='consultations' element={<Consultations />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
