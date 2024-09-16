import React from "react";
function MenuItem({ title, description, image, price }) {
  return (
    <>
      <div className="menu-item">
        <img src={image} alt={title} className="menu-item-img" />
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          {price}{" "}
          <span>
            <button>
              <img src="/images/add-black.svg" className="menu-add" />
            </button>
          </span>
        </p>
      </div>
    </>
  );
}

export default MenuItem;
