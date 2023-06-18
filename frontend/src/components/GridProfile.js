import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from './Auth/AuthContext';
import { Card } from './Card';

export const GridProfile = () => {
  const [fruits, setFruits] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchFruits = async ( token ) => {
    try {
      const response = await axios.post('https://e04-backend.vercel.app/profile', { token: token });
      setFruits(response.data);
    } catch (error) {
      console.error('Error al obtener los objetos:', error);
    }
  };

  useEffect(() => {
    fetchFruits(token);
  }, [token]);


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
