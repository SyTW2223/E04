import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom';


function RegisterComponent () {
    return (
        <div className="body-auth">
            <div className="auth-wrapper">
                <div className="form-box register">
                    <h3>Únete a Fruit.js</h3>
                    <p>Complementa el formulario para registrarse.</p>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-user"></i></span>
                            <input type="text" required></input>
                            <label>Usuario</label> 
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-lock"></i></span>
                            <input type="password" required></input>
                            <label>Contraseña</label> 
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox"></input>Acepto los Términos y Condiciones</label>
                        </div>
                        <button type="sumbit" className="btn-auth">Registrarse</button>
                        <div className="login-register">
                            <p>¿Ya estás dentro de Fruit.js? <Link to="/login">Inicia sesión</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;