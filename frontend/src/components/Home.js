import React from 'react';
import { Grid } from './Grid';
import title from '../images/header-logo.png'

export const Home = () => {
  const data = {
    name: 'Banana',
    family: 'Pingas',
    calories: 100,
    fat: 5,
    sugar: 10,
    carbohydrates: 20,
    protein: 15
  };

  return (
    <div>
      <header className="App-header">
        <img src={title} className="home-logo" alt="logo" />
      </header>
      <Grid data = {data}/>
    </div>
  )
}
