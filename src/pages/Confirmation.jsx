import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Confirmation() {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrderDetails = localStorage.getItem("orderDetails");
    if (savedOrderDetails) {
      setOrderDetails(JSON.parse(savedOrderDetails));
    } else {
      navigate("/"); // Redirect to home if no order details
    }
  }, [navigate]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="bg-confirmation">
      <div className="confirmation-page">
        <div className="order-details">
          <h3>Order Summary</h3>
          <ul>
            {orderDetails.cartItems.map((item, index) => (
              <li key={index}>
                {item.title} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
          <h3>Delivery Address:</h3>
          <p>{orderDetails.deliveryAddress}</p>
          <h3>Payment Method:</h3>
          <p>{orderDetails.paymentMethod}</p>
          <Link to="/">
            <button className="confirmation-btn-home">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
