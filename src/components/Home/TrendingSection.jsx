import React, { useRef, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../../data/products";

const ProductCard = memo(
  ({ product, index, isWishlisted, onToggleWishlist }) => (
    <Link to={`/product/${product.id}`} className="trending-card-new">
      <div className="trending-card-inner">
        <div className="trending-image-container">
          <img
            src={product.image}
            alt={product.name}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="trending-image-overlay"></div>
          <button
            className={`trending-wishlist ${isWishlisted ? "active" : ""}`}
            onClick={(e) => onToggleWishlist(e, product.id)}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          {product.badge && (
            <span className="trending-badge">{product.badge}</span>
          )}
        </div>
        <div className="trending-card-content">
          <span className="trending-brand">{product.brand}</span>
          <h3 className="trending-name">{product.name}</h3>
          <div className="trending-bottom">
            <span className="trending-price">€{product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  ),
);

ProductCard.displayName = "ProductCard";

const TrendingSection = () => {
  const [wishlist, setWishlist] = useState({});
  const scrollRef = useRef(null);

  const toggleWishlist = useCallback((e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }, []);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth =
        container.querySelector(".trending-card-new")?.offsetWidth || 280;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 4;

      container.scrollTo({
        left:
          direction === "left"
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="trending-section">
      <div className="trending-bg-pattern"></div>

      <div className="trending-container">
        <div className="trending-carousel-wrapper">
          <div className="trending-arrow-spacer">
            <button
              className="trending-arrow"
              onClick={() => scroll("left")}
              aria-label="Previous items"
            >
              <ChevronLeft size={32} />
            </button>
          </div>

          <div className="trending-main">
            <div className="trending-header">
              <h2 className="trending-title">
                <span className="trending-accent">Trending</span>
              </h2>
            </div>
            <div className="trending-cards" ref={scrollRef}>
              {products.map((product, index) => (
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

          <div className="trending-arrow-spacer">
            <button
              className="trending-arrow"
              onClick={() => scroll("right")}
              aria-label="Next items"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TrendingSection);
