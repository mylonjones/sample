import React from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  return(
    <nav className='navBar'>
      <img
        className='logo'
        src='photos/logo.png'
        alt='logo'
        height='60'
        width='60'
      />
      <div>
        <Link className='navLink' to='more'>More</Link>
        <Link className='navLink' to='consultations'>Consultations</Link>
        <Link className='navLink' to='exercise'>Exercise</Link>
        <Link className='navLink' to='diet'>Diet</Link>
        <Link className='navLink' to='/'>Home</Link>
      </div>
    </nav>
  )
}