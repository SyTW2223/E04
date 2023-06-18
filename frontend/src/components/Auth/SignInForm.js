import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    console.log('Valores del formulario de inicio de sesión:', username, password);

    axios
      .post('https://e04-backend.vercel.app/signin', { user: username, password: password })
      .then((response) => {
        if (response.status === 200) {
          // Inicio de sesión exitoso
          setFormSubmitted(true);
          setIsError(false);
          const token = response.data.token;
          handleLogin(token);
        } else {
          // Código de estado inesperado
          setFormSubmitted(true);
          setIsError(true);
        }
      })
      .catch((error) => {
        setFormSubmitted(true);
        setIsError(true);
      });
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  if (formSubmitted && !isError) {
    return (
      <div className="feedback-box">
        <h2 className="correct-title">Inicio de sesión exitoso</h2>
        <p>Has iniciado sesión correctamente.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  if (formSubmitted && isError) {
    return (
      <div className="feedback-box">
        <h2 className="error-title">Error en el inicio de sesión</h2>
        <p>
          Ha ocurrido un error durante el inicio de sesión. Por favor, verifica tus credenciales e intenta nuevamente.
        </p>
        <button className="btn-back" onClick={handleReloadPage}>
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <div className="form-box login">
      <h3>¡Hola de nuevo!</h3>
      <p>Introduce tus datos para acceder a tu perfil.</p>
      <form onSubmit={handleLoginSubmit}>
        <div className="input-box">
          <span className="icon">
            <i className="fa-solid fa-user"></i>
          </span>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Usuario</label>
        </div>
        <div className="input-box">
          <span className="icon">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Contraseña</label>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />Recuérdame
          </label>
          <a href="localhost:3000/">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" className="btn-auth">
          Iniciar sesión
        </button>
        <div className="login-register">
          <p>
            ¿Aún no estás en Fruit.js? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;