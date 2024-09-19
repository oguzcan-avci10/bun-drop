import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
function Home() {
  const [popular, setPopular] = useState([]);

  // get popular burgers to show in home page
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        // Filter to get burgers with id's 1-3

        const filteredData = data.filter((item) => item.id <= 3);
        setPopular(filteredData);

        const savedOrderDetails = localStorage.getItem("orderDetails");
        if (savedOrderDetails) {
          localStorage.removeItem("orderDetails");
        }
      });
  }, []);

  return (
    <>
      <div className="bg-home">
        <div className="top-container-home">
          <img src="/images/logo.png" alt="bun-drop-logo" className="logo" />
          <Link to="/menu">
            <button className="btn-menu"> Menu</button>
          </Link>
        </div>
        <h1 className="popular-heading">
          Popular Burgers{" "}
          <img src="/images/fire.png" alt="" className="fire-icon" />
        </h1>
        <div className="popular-burgers">
          {popular.map((burger) => (
            <div key={burger.id}>
              <Card key={burger.id} title={burger.title} image={burger.image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
