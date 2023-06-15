import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom';


function LoginComponent () {
    return (
        <div className="body-auth">
            <div className="auth-wrapper">
                <div className="form-box login">
                    <h3>¡Hola de nuevo!</h3>
                    <p>Introduce tus datos para acceder a tu perfil.</p>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-user"></i></span>
                            <input type="text" id="username" required></input>
                            <label>Usuario</label> 
                        </div>
                        <div className="input-box">
                            <span className="icon"><i className="fa-solid fa-lock"></i></span>
                            <input type="password" required></input>
                            <label>Contraseña</label> 
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox"></input>Recuérdame</label>
                            <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button type="sumbit" className="btn-auth">Iniciar sesión</button>
                        <div className="login-register">
                            <p>¿Aún no estás en Fruit.js? <Link to="/register">Regístrate</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;