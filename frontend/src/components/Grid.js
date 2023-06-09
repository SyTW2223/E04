import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from './Card';

export const Grid = () => {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/home');
        setFruits(response.data);
      } catch (error) {
        console.error('Error al obtener los objetos:', error);
      }
    };

    fetchFruits();
  }, []); 

  return (
    <div className='cuadricula'>
        {
          fruits && fruits.map((fruit) => (
            <div key = {fruit.id}>
              <Card data = {fruit}/>
            </div>
          ))  
        }
    </div>
  )
}
