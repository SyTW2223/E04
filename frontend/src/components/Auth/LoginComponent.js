import React from 'react'
import LoginForm from './SignInForm';

function LoginComponent () {
    return (
        <div className="body-auth">
            <div className="auth-wrapper">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
}

export default LoginComponent;