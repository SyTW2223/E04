import React, { useContext } from 'react';
import { Grid } from './Grid';
import title from '../images/header-logo.png'
import { AuthContext } from '../components/Auth/AuthContext';
import { Navigate } from 'react-router-dom';

export const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  } 
  else {
    return (
      <div>
        <header className="App-header">
          <img src={title} className="home-logo" alt="logo" />
        </header>
        <Grid />
      </div>
    )
  }
}
