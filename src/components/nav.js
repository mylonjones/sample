import React from 'react';
import { NavLink } from "react-router-dom";

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
        <NavLink  className={({ isActive }) => 'navLink' + (isActive ? ' active': '')} to='more'>More</NavLink>
        <NavLink  className={({ isActive }) => 'navLink' + (isActive ? ' active': '')} to='blog'>Blog</NavLink>
        <NavLink  className={({ isActive }) => 'navLink' + (isActive ? ' active': '')} to='consultations'>Consultations</NavLink>
        <NavLink  className={({ isActive }) => 'navLink' + (isActive ? ' active': '')} to='exercise'>Exercise</NavLink>
        <NavLink  className={({ isActive }) => 'navLink' + (isActive ? ' active': '')} to='diet'>Diet</NavLink>
        <NavLink end  className={({ isActive }) => 'navLink' + (isActive ? ' active': '')} to='/'>Home</NavLink>
      </div>
    </nav>
  )
}