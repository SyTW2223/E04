import React from 'react'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:8080/signup';

function RegisterComponent () {
    const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
		}
		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			setSuccess(true);
			//clear state and controlled inputs
			setUser('');
			setPwd('');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed');
			}
			errRef.current.focus();
		}
	};

    return (
        <section>
            <div className="body-auth">
                <div className="auth-wrapper">
                    <div className="form-box register">
                        <h3>Únete a Fruit.js</h3>
                        <p>Complementa el formulario para registrarse.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <span className="icon"><i className="fa-solid fa-user"></i></span>
                                <input 
                                    type="text" 
                                    id="username"
                                    ref={userRef}
                                    autoComplete='off'
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? 'false' : 'true'}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <label>Usuario</label> 
                            </div>
                            <div className="input-box">
                                <span className="icon"><i className="fa-solid fa-lock"></i></span>
                                <input 
                                    type="password" 
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <label>Contraseña</label> 
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox"></input>Acepto los Términos y Condiciones</label>
                            </div>
                            <div className="error-msg">
                                <p 
                                ref={errRef}
                                className={errMsg ? 'errmsg' : 'offscreen'}
                                aria-live="assertive"
                                >
                                    {errMsg}
                                </p>
                            </div>
                            <button type="sumbit" className="btn-auth">Registrarse</button>
                            <div className="login-register">
                                <p>¿Ya estás dentro de Fruit.js? <Link to="/login">Inicia sesión</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterComponent;