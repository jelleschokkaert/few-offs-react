import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const ShopProductCard = ({
  id,
  image,
  brand,
  name,
  price,
  badge,
  priority = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="shop-product-card">
      <Link to={`/product/${id}`} className="block">
        <div className="shop-image-wrapper">
          <img
            src={image}
            alt={name}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
          <button
            className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          {badge && <span className="shop-badge">{badge}</span>}
          <button className="add-to-cart-btn">View Product</button>
        </div>
        <div className="shop-product-info">
          <div className="shop-info-left">
            <span className="shop-brand">{brand}</span>
            <h3 className="shop-name">{name}</h3>
          </div>
          <div className="shop-info-right">
            <span className="shop-price">€{price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopProductCard;
