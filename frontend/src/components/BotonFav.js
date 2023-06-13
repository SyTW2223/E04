import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const BotonFav = ({ data }) => {
  const [style, setStyle] = useState("star-button");
  const [fruit, addFruit] = useState([]);
  let changeStyle = () => {
    setStyle("fav-button");
  };
  
  if (style === "star-button"){
    changeStyle = () => {
      console.log("Añadido a favoritos");
      setStyle("fav-button")

    }
  }else {
    changeStyle = () => {
      console.log("Quitado de favoritos");
  
      setStyle("star-button")
    }
  }
  
  return (
    <button className={style} onClick={changeStyle}>
      ★
    </button>
  )
}
