import React from "react";
function CartItem({ title, image, price, quantity, onIncrease, onDecrease }) {
  return (
    <>
      <div className="shopping-cart">
        <img src={image} alt="product-image" className="shopping-cart-img" />
        <p className="shopping-cart-title">{title}</p>
        <p className="shopping-cart-price">${price}</p>
        {/* quantity */}
        <div className="quantity-controls">
          <button onClick={onDecrease} disabled={quantity < 1}>
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            style={{ width: "40px", textAlign: "center" }}
          />
          <button onClick={onIncrease}>+</button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
