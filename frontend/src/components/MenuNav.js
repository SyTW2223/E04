import React from 'react';
import imagen from './imagenes/NBA-Logo.png';

function MenuNavegacion() {
  return (
    <nav className="menu-navegacion">
      <div className='logo'>
        <img src={imagen} alt="logo"/>
      </div>
      <ul className="menu-lista">
        <li><a href="/">Inicio</a></li>
        <li><a href="/sobre-nosotros">Sobre nosotros</a></li>
        <li><a href="/servicios">Servicios</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default MenuNavegacion;
