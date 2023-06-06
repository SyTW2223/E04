import React, { useState } from 'react'

export const BotonFav = ({ onClick, active }) => {
  const [style, setStyle] = useState("star-button");
  let changeStyle = () => {
    console.log("Añadido a favoritos");
  
    setStyle("fav-button");
  };

  if (style === "star-button"){
    changeStyle = () => {
      setStyle("fav-button")
    }
  }else {
    changeStyle = () => {
      setStyle("star-button")
    }
  }
  
  return (
    <button className={style} onClick={changeStyle}>
      ★
    </button>
  )
}
