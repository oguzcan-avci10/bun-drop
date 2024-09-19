import React from "react";
function Card({ image, title, price }) {
  return (
    <>
      <img src={image} alt="burger" />
      <p className="card-title">{title}</p>
      <p>{price}</p>
    </>
  );
}

export default Card;
