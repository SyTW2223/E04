import React from 'react'
import { BotonFav } from './BotonFav'

export const Card = ({ data }) => {
  return (
    <div className="card">
      <BotonFav />
      <h2>{data.name}</h2>
      <p><b>Family: </b>{data.family}</p>
      <p><b>Calories: </b>{data.calories} cal</p>
      <p><b>Fat: </b>{data.fat} g</p>
      <p><b>Sugar: </b>{data.sugar} g</p>
      <p><b>Carbohydrates: </b>{data.carbohydrates} g</p>
      <p><b>Protein: </b>{data.protein} g</p>
    </div>
  )
}
