import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formSubmitted: false,
      isError: false
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    console.log('Form sumbitted');

    const { username, password } = this.state;

    console.log('Valores del formulario:', username, password);


    axios.post('https://e04-e04.vercel.app/signup', { "user": username, "password": password, "fruits": [] })
      .then((response) => {
        // Aquí puedes manejar la respuesta del backend
        console.log(response.status);
        if (response.status === 200) {
          console.log('Registro exitoso');
          this.setState({ formSubmitted: true, isError: false});
        } else {
          console.log('Error en el registro');
          this.setState({ formSubmitted: true, isError: true});
        }
      })
      .catch((error) => {
        // Aquí puedes manejar los errores de la solicitud
        console.error(error);
        this.setState({ formSubmitted: true, isError: true});
        if (error.response) {
          // Error de respuesta del servidor (código de estado no 2xx)
          console.log('Error en el registro:', error.response.data.message);
        } else if (error.request) {
          // No se recibió respuesta del servidor
          console.log('No se recibió respuesta del servidor');
        } else {
          // Otro tipo de error
          console.error(error.message);
        }
      });
  }

  handleReloadPage = () => {
    window.location.reload();
  }

  render() {
    const { username, password, formSubmitted, isError } = this.state;

    if (formSubmitted && !isError) {
      return (
        <div className='feedback-box'>
          <h2 className='correct-title'>Registro exitoso</h2>
          <p>Tu registro ha sido procesado correctamente.</p>
          <Link to="/login">Ir al formulario de inicio de sesión</Link>
        </div>
      );
    }
  
    if (formSubmitted && isError) {
      return (
        <div className='feedback-box'>
          <h2 className='error-title'>Error en el registro</h2>
          <p>Ha ocurrido un error durante el registro. Por favor, intenta nuevamente.</p>
          <button className='btn-back' onClick={this.handleReloadPage}>Volver al formulario</button>
        </div>
      );
    }
  
    return (
      <div className="form-box register">
        <h3>Únete a Fruit.js</h3>
        <p>Complementa el formulario para registrarse.</p>
        <form id="register-form" onSubmit={this.handleFormSubmit}>
          <div className="input-box">
              <span className="icon"><i className="fa-solid fa-user"></i></span>
              <input id="username" type="text" name="username" autoComplete='off' required value={username} onChange={this.handleInputChange} />
              <label>Usuario</label>
          </div>
          <div className="input-box">
              <span className="icon"><i className="fa-solid fa-lock"></i></span>
              <input id="password" type="password" name="password" required value={password} onChange={this.handleInputChange} />
              <label>Contraseña</label>
          </div>
          <div className="remember-forgot">
              <label><input type="checkbox"></input>Acepto los Términos y Condiciones</label>
          </div>
          <button type="submit" className="btn-auth">Registrarse</button>
          <div className="login-register">
              <p>¿Ya estás dentro de Fruit.js? <Link to="/login">Inicia sesión</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;