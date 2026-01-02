import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Breadcrumbs from "../components/UI/Breadcrumbs";
import { products } from "../data/products";

const CartPage = () => {
  const cartItems = [
    { ...products[0], selectedSize: "L", selectedColor: "White", quantity: 1 },
    { ...products[1], selectedSize: "M", selectedColor: "Black", quantity: 2 },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{
          paddingTop: "8rem",
          minHeight: "100vh",
          paddingBottom: "4rem",
        }}
      >
        <Breadcrumbs />

        <div className="page-header">
          <h1
            className="category-title"
            style={{ fontSize: "4rem", marginBottom: "1rem" }}
          >
            Shopping Cart
          </h1>
          <p className="category-description">
            Review your selection before checkout.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="cart-header-row">
                <span>Product</span>
                <span>Quantity</span>
                <span>Price</span>
              </div>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-brand">{item.brand}</div>
                    <Link to={`/product/${item.id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <div className="cart-item-meta">
                      <span>Size: {item.selectedSize}</span>
                      <span>Color: {item.selectedColor}</span>
                    </div>
                  </div>
                  <div className="cart-item-quantity">
                    <div className="quantity-controls">
                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    €{item.price * item.quantity}
                  </div>
                  <button className="cart-remove-btn" aria-label="Remove item">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>€{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `€${shipping}`}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>€{total}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <p className="secure-checkout-text">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Secure Checkout
              </p>
            </div>
          </div>
        ) : (
          <div className="empty-cart-message">
            <h2>Your cart is empty</h2>
            <Link to="/" className="btn-cta">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
