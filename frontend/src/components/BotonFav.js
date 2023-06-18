import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Auth/AuthContext';
import axios from 'axios';

export const BotonFav = ({ data }) => {
  const { token } = useContext(AuthContext);
  const [style, setStyle] = useState("star-button");

  const isFav = async () => {
    const response = await axios.post('https://e04-e04.vercel.app/profile', { token: token });
    const array = response.data;
    const objetoEncontrado = array.find(fruit => fruit.id === data.id);
    if (objetoEncontrado) {
      setStyle("fav-button");
    }
  }

  useEffect( () => {
    isFav();
  }, []);
  
  let changeStyle = () => {
    setStyle("fav-button");
  };
  
  if (style === "star-button"){
    changeStyle = async ( token ) => {
      try {
        const response = await axios.post('https://e04-e04.vercel.app/addfavfruit', { token: token, fruit: data.id });
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
      const response = await axios.post('https://e04-e04.vercel.app/removefavfruit', { token: token, fruit: data.id });
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
