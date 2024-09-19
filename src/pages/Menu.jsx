import React, { useEffect, useState } from "react";
import MenuItem from "../components/MenuItem";
import { Link } from "react-router-dom";
function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [userFilter, setUserFilter] = useState("");

  // fetch menu
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  // load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // save cart to localStorage when cart updates
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // function to add items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // ff the item is already in the cart, increase its quantity
        existingItem.quantity += 1;
        return [...prevCart];
      } else {
        // If it's a new item, add it with a quantity of 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // function to handle button clicks
  const handleFilterChange = (category) => {
    setUserFilter(category);
  };

  // filtered menu items based on the selected category
  const filteredMenu = userFilter
    ? menu.filter((item) => item.category === userFilter)
    : menu;

  return (
    <>
      <div className="bg-menu">
        <div className="top-container-menu">
          <img src="/images/logo.png" alt="bun-drop-logo" />
          <button className="menu-btn" onClick={() => handleFilterChange("")}>
            Menu
          </button>
          <button
            className="menu-btn"
            onClick={() => handleFilterChange("sides")}
          >
            Sides
          </button>
          <button
            className="menu-btn"
            onClick={() => handleFilterChange("burgers")}
          >
            Burgers
          </button>
          <button
            className="menu-btn"
            onClick={() => handleFilterChange("drinks")}
          >
            Drinks
          </button>
          <Link to="/cart">
            <button className="menu-btn">Cart ({cart.length})</button>
          </Link>
        </div>
        <div className="menu-container">
          {filteredMenu.map((item) => (
            <MenuItem
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
