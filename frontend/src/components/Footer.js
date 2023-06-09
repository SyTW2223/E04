import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.png';

export const Footer = () => {
  return (
    <div>
      <footer className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </footer>
      <footer className="menu-navegacion">
        <ul className="menu-lista">
          <li><Link to="/profile">Perfil</Link></li>
          <li><Link to="/login">Iniciar sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
        </ul>
        <div className="trademark">&copy; 2023 Fruit.js. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}
