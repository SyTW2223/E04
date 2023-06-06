import React, { useState } from 'react'
import { BotonFav } from './BotonFav'

export const Card = ({ data }) => {
  return (
    <div className="card">
      <BotonFav />
      <h2>{data.name}</h2>
      <p><a className='categoria'>Family: </a>{data.family}</p>
      <p><a className='categoria'>Calories: </a>{data.calories} cal</p>
      <p><a className='categoria'>Fat: </a>{data.fat} g</p>
      <p><a className='categoria'>Sugar: </a>{data.sugar} g</p>
      <p><a className='categoria'>Carbohydrates: </a>{data.carbohydrates} g</p>
      <p><a className='categoria'>Protein: </a>{data.protein} g</p>
    </div>
  )
}
