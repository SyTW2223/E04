import React from 'react';
import imagen from '../images/NBA-Logo.png';
import { Link, Outlet } from 'react-router-dom';

function MenuNavegacion() {
  return (
    <nav className="menu-navegacion">
      <div className='logo'>
        <img src={imagen} alt="logo"/>
      </div>
      <ul className="menu-lista">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="about">Sobre Nosotros</Link>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="register">Registro</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
}

export default MenuNavegacion;
