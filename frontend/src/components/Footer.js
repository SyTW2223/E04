import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="menu-navegacion">
      <ul className="menu-lista">
        <li><Link to="/about">Sobre nosotros</Link></li>
        <li><Link to="/login">Iniciar sesión</Link></li>
        <li><Link to="/register">Registrarse</Link></li>
      </ul>
      <div className="trademark">&copy; 2023 Fruit.js. Todos los derechos reservados.</div>
    </footer>
  )
}
