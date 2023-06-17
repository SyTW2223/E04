import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Auth/AuthContext';

const LogoutPage = () => {
  const { handleLogout, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className='App'>
      <h1 className='page-header'>Cerrar sesión</h1>
          <div className="logout-page">
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <button onClick={handleLogoutClick}>Cerrar sesión</button>
            <p>Volver al <Link to="/">inicio</Link>.</p>
          </div>
    </div>
  );
};

export default LogoutPage;