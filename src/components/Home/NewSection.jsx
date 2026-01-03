import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { products } from "../../data/products";

const GRID_PATTERNS = [
  "new-card-large",
  "new-card-tall",
  "new-card-normal",
  "new-card-normal",
  "new-card-wide",
  "new-card-normal",
  "new-card-normal",
];

const ProductCard = memo(
  ({ product, index, gridClass, isWishlisted, onToggleWishlist }) => (
    <Link to={`/product/${product.id}`} className={`new-card ${gridClass}`}>
      <div className="new-card-image">
        <img
          src={product.image}
          alt={product.name}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <div className="new-card-overlay"></div>
        <button
          className={`new-wishlist ${isWishlisted ? "active" : ""}`}
          onClick={(e) => onToggleWishlist(e, product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        <span className="new-badge">NEW</span>
      </div>
      <div className="new-card-info">
        <span className="new-brand">{product.brand}</span>
        <h3 className="new-name">{product.name}</h3>
        <div className="new-card-bottom">
          <span className="new-shop-link">
            Shop now
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  ),
);

ProductCard.displayName = "ProductCard";

const NewSection = () => {
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

  const displayProducts = products.slice(0, 7);

  return (
    <section className="new-section">
      <div className="new-container">
        <div className="new-header">
          <div className="new-title-wrapper">
            <h2 className="new-title">
              <span className="new-accent">New</span>
              <span className="new-subtitle">Fresh arrivals just dropped</span>
            </h2>
          </div>
          <Link to="/women" className="new-view-all">
            Shop New
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="new-bento-grid">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              gridClass={GRID_PATTERNS[index % GRID_PATTERNS.length]}
              isWishlisted={wishlist[product.id]}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(NewSection);
