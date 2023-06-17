import React, { useState } from 'react'
import { AuthContext } from './Auth/AuthContext';
import axios from 'axios';

export const BotonFav = ({ data }) => {
  const [style, setStyle] = useState("star-button");
  let changeStyle = () => {
    setStyle("fav-button");
  };
  
  if (style === "star-button"){
    changeStyle = async ( token ) => {
      console.log(token)
      try {
        const response = await axios.post('http://localhost:8080/addfavfruit', { token: token, fruit: data.id });
        if (response.status === 200) {
          console.log("Añadido a favoritos");
          setStyle("fav-button");
        }
      } catch (error) {
        console.error('Error al obtener los objetos:', error);
      }

    }
  }else {
    changeStyle = async ( token ) => {
      const response = await axios.post('http://localhost:8080/removefavfruit', { token: token, fruit: data.id });
      if (response.status === 200) {
        console.log("Quitado de favoritos");
        setStyle("star-button");
      }
    }
  }
  
  return (
    <AuthContext.Consumer>
      {({ token }) => (
        <button className={style} onClick={() => changeStyle(token)}>
        ★
        </button> 
      )}
    </AuthContext.Consumer>
  )
}
