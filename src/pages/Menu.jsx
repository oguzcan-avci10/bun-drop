import React, { useEffect, useState } from "react";
import MenuItem from "../components/MenuItem";
import { Link } from "react-router-dom";
function Menu() {
  const [menu, setMenu] = useState([]);
  const [userFilter, setUserFilter] = useState("");

  // fetch menu
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  // function to handle button clicks
  const handleFilterChange = (category) => {
    setUserFilter(category);
  };

  // Filtered menu items based on the selected category
  const filteredMenu = userFilter
    ? menu.filter((item) => item.category === userFilter)
    : menu;

  return (
    <>
      <div className="bg-home-menu">
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
            <button className="menu-btn">Cart</button>
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
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
