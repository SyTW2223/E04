import React from 'react'
import { Card } from './Card'

export const Grid = ({ data }) => {
  return (
    <div className='cuadricula'>
      <div><Card data = {data}/></div>
      <div><Card data = {data}/></div>
      <div><Card data = {data}/></div>
      <div><Card data = {data}/></div>
      <div><Card data = {data}/></div>
      <div><Card data = {data}/></div>
    </div>
  )
}
