import React from 'react';
import imagen from '../images/header-logo.png';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './Auth/AuthContext';

function MenuNavegacion() {
  return (
    <AuthContext.Consumer>
      {({ isLoggedIn }) => (
        <nav className="menu-navegacion">
          <Link to="/" className="logo">
            <img src={imagen} alt="logo" />
          </Link>
          <ul className="menu-lista">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="profile">Perfil</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link to="logout">Desconectar</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="login">Iniciar sesión</Link>
                </li>
                <li>
                  <Link to="register">Registro</Link>
                </li>
              </>
            )}
          </ul>
          <Outlet />
        </nav>
      )}
    </AuthContext.Consumer>
  );
}

export default MenuNavegacion;
