import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartiItem";

function Cart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [step, setStep] = useState("cart"); // current step: 'cart', 'checkout', 'payment'
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cardName: "",
    cvc: "",
  });
  const [swishNumber, setSwishNumber] = useState("");
  const [errors, setErrors] = useState({});

  // scrolling to sectionss
  const checkoutRef = useRef(null);
  const paymentRef = useRef(null);
  const navigate = useNavigate();

  // loading cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = savedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setShoppingCart(updatedCart);
  }, []);

  // increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = [...shoppingCart];
    updatedCart[index].quantity += 1;
    setShoppingCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // iecrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = [...shoppingCart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1); // Remove item if quantity is 0
    }
    setShoppingCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // calculate total price
  const getTotalPrice = () => {
    return shoppingCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // scroll to the section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // validate checkout form
  const validateCheckout = () => {
    let formErrors = {};
    if (!form.name) formErrors.name = "Name is required";
    if (!form.street) formErrors.street = "Street is required";
    if (!form.city) formErrors.city = "City is required";
    if (!form.postalCode || !/^\d{1,5}$/.test(form.postalCode))
      formErrors.postalCode = "Valid postal code is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // validate payment form
  const validatePayment = () => {
    let paymentErrors = {};
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !/^\d{16}$/.test(cardDetails.cardNumber))
        paymentErrors.cardNumber = "Valid card number is required";

      if (
        !cardDetails.expiryDate ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)
      ) {
        paymentErrors.expiryDate = "Valid expiry date is required (MM/YY)";
      } else {
        const [month, year] = cardDetails.expiryDate.split("/").map(Number);
        const expiryDate = new Date(2000 + year, month - 1); // check if expiry date is in past
        const now = new Date();

        if (expiryDate < now) {
          paymentErrors.expiryDate = "Expiry date must be in the future";
        }
      }

      if (!cardDetails.cardName)
        paymentErrors.cardName = "Cardholder's name is required";
      if (!cardDetails.cvc || !/^\d{3}$/.test(cardDetails.cvc))
        paymentErrors.cvc = "Valid CVC is required";
    } else if (paymentMethod === "swish") {
      if (!swishNumber || !/^\d{10}$/.test(swishNumber))
        paymentErrors.swishNumber = "Valid 10-digit Swish number is required";
    }

    setErrors(paymentErrors);
    return Object.keys(paymentErrors).length === 0;
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (shoppingCart.length === 0) return;
    setStep("checkout");
    scrollToSection(checkoutRef);
  };

  // Proceed to payment
  const proceedToPayment = () => {
    if (validateCheckout()) {
      setStep("payment");
      scrollToSection(paymentRef);
    }
  };

  // Save order details to localStorage
  const saveOrderDetails = () => {
    const orderDetails = {
      cartItems: shoppingCart,
      total: getTotalPrice(),
      deliveryAddress: `${form.name}, ${form.street}, ${form.city}, ${form.postalCode}`,
      paymentMethod: paymentMethod === "card" ? "Card" : "Swish",
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");
  };
  const handleConfirmOrder = () => {
    if (validatePayment()) {
      saveOrderDetails();
      navigate("/confirmation"); // navigation to confirmation page after validation
    }
  };

  return (
    <>
      <div className="bg-cart">
        <div className="product-info-cart">
          <h2 className="product-tag-cart">Product</h2>
          <h2 className="product-tag-cart">Title</h2>
          <h2 className="product-tag-cart">Price</h2>
          <h2 className="product-tag-cart">Quantity</h2>
        </div>
        <div className="product-data-cart">
          {shoppingCart.map((item, index) => (
            <CartItem
              key={index}
              title={item.title}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              onIncrease={() => increaseQuantity(index)}
              onDecrease={() => decreaseQuantity(index)}
            />
          ))}
        </div>

        {/* Checkout Section */}
        {step === "checkout" && (
          <div ref={checkoutRef} className="checkout-section">
            <h2>Checkout</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Street:</label>
              <input
                type="text"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
              />
              {errors.street && <span className="error">{errors.street}</span>}
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label>Postal Code:</label>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
              {errors.postalCode && (
                <span className="error">{errors.postalCode}</span>
              )}
            </div>
            <button onClick={proceedToPayment} className="proceed-button">
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Payment Section */}
        {step === "payment" && (
          <div ref={paymentRef} className="payment-section">
            <h2>Payment</h2>
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  value="swish"
                  checked={paymentMethod === "swish"}
                  onChange={() => setPaymentMethod("swish")}
                />
                Swish
              </label>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === "card" && (
              <div className="card-payment">
                <div className="form-group">
                  <label>Card Number:</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardNumber: e.target.value,
                      })
                    }
                    maxLength="16"
                  />
                  {errors.cardNumber && (
                    <span className="error">{errors.cardNumber}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Expiry Date (MM/YY):</label>
                  <input
                    type="text"
                    value={cardDetails.expiryDate}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiryDate: e.target.value,
                      })
                    }
                    maxLength="5"
                  />
                  {errors.expiryDate && (
                    <span className="error">{errors.expiryDate}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Name on Card:</label>
                  <input
                    type="text"
                    value={cardDetails.cardName}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardName: e.target.value,
                      })
                    }
                  />
                  {errors.cardName && (
                    <span className="error">{errors.cardName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>CVC:</label>
                  <input
                    type="text"
                    value={cardDetails.cvc}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvc: e.target.value })
                    }
                    maxLength="3"
                  />
                  {errors.cvc && <span className="error">{errors.cvc}</span>}
                </div>
              </div>
            )}

            {/* Swish Payment Form */}
            {paymentMethod === "swish" && (
              <div className="swish-payment">
                <label>Swish Number:</label>
                <input
                  type="text"
                  value={swishNumber}
                  onChange={(e) => setSwishNumber(e.target.value)}
                  maxLength="10"
                />
                {errors.swishNumber && (
                  <span className="error">{errors.swishNumber}</span>
                )}
              </div>
            )}

            {/* button to confirm order and navigate to confirmation page */}
            <button
              className="proceed-button"
              disabled={!paymentMethod} // disabled if no payment is selected
              onClick={handleConfirmOrder} // call handleConfirmOrder
            >
              Confirm Order
            </button>
          </div>
        )}

        {/* Footer: Total and Checkout */}
        {step === "cart" && (
          <div className="bottom-container-cart">
            <div className="total-container">
              <span className="total">Total: ${getTotalPrice()}</span>
              <button onClick={proceedToCheckout} className="proceed-button">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
