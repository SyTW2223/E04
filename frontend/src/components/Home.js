import React from 'react';
import { Grid } from './Grid';
import title from '../images/header-logo.png'

export const Home = () => {
  return (
    <div>
      <header className="App-header">
        <img src={title} className="home-logo" alt="logo" />
      </header>
      <Grid />
    </div>
  )
}
