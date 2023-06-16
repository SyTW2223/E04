import React from 'react'
import SignupForm from './Auth/SignUpFrom';

function RegisterComponent () {
    return (
        <section>
            <div className="body-auth">
                <div className="auth-wrapper">
                    <div className="form-box register">
                        <h3>Únete a Fruit.js</h3>
                        <p>Complementa el formulario para registrarse.</p>
                        <SignupForm></SignupForm>
                    </div>
                </div>
            </div>
        </section>
)}

export default RegisterComponent;