import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { products } from "../../data/products";

const ProductCard = memo(
  ({ product, index, isWishlisted, onToggleWishlist }) => (
    <Link to={`/product/${product.id}`} className="foryou-card">
      <div className="foryou-card-image">
        <img
          src={product.image}
          alt={product.name}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
        <button
          className={`foryou-wishlist ${isWishlisted ? "active" : ""}`}
          onClick={(e) => onToggleWishlist(e, product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        {product.badge && <span className="foryou-badge">{product.badge}</span>}
      </div>
      <div className="foryou-card-info">
        <span className="foryou-brand">{product.brand}</span>
        <h3 className="foryou-name">{product.name}</h3>
        <span className="foryou-price">€{product.price}</span>
      </div>
    </Link>
  ),
);

ProductCard.displayName = "ProductCard";

const ForYouSection = () => {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = useCallback((e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }, []);

  if (products.length === 0) return null;

  const displayProducts = products.slice(0, 8);

  return (
    <section className="foryou-section">
      <div className="foryou-container">
        <div className="foryou-header">
          <h2 className="foryou-title">
            <span className="foryou-accent">For You</span>
            <span className="foryou-subtitle">Picked just for you</span>
          </h2>
          <Link to="/men" className="foryou-view-all">
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="foryou-grid">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isWishlisted={wishlist[product.id]}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ForYouSection);
