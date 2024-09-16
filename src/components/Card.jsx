import React from "react";
function Card({ image, title }) {
  return (
    <>
      <img src={image} alt="burger" />
      <p className="card-title">{title}</p>
    </>
  );
}

export default Card;
