import React from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
  return(
    <nav className='dashPartition'>
      <img
        className='logo'
        src='photos/logo.png'
        alt='logo'
        height='60'
        width='60'
      />
      <div>
        <Link className='navLink' to='/'>Home</Link>
        <Link className='navLink' to='about'>About</Link>
        <Link className='navLink' to='contact'>Contact</Link>
        <Link className='navLink' to='more'>More</Link>
      </div>
    </nav>
  )
}