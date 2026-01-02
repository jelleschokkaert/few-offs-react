import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { products } from "../../data/products";

const NewSection = () => {
  const [isWishlisted, setIsWishlisted] = useState({});

  // Use all products to fill the grid completely
  const displayProducts = products;

  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (displayProducts.length === 0) return null;

  // Determine grid size classes based on index for bento layout
  // Pattern fills 4 columns perfectly: large(2x2) + tall(1x2) + 2 normal(1x1) = 4 cols for 2 rows
  // Then wide(2x1) + normal(1x1) + normal(1x1) = 4 cols for 1 row
  const getGridClass = (index) => {
    const patterns = [
      "new-card-large", // 0: 2x2
      "new-card-tall", // 1: 1x2
      "new-card-normal", // 2: 1x1
      "new-card-normal", // 3: 1x1
      "new-card-wide", // 4: 2x1
      "new-card-normal", // 5: 1x1
      "new-card-normal", // 6: 1x1
      "new-card-tall", // 7: 1x2
      "new-card-normal", // 8: 1x1
      "new-card-normal", // 9: 1x1
      "new-card-wide", // 10: 2x1
      "new-card-normal", // 11: 1x1
      "new-card-normal", // 12: 1x1
    ];
    return patterns[index % patterns.length];
  };

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
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={`new-card ${getGridClass(index)}`}
            >
              <div className="new-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="new-card-overlay"></div>
                <button
                  className={`new-wishlist ${isWishlisted[product.id] ? "active" : ""}`}
                  onClick={(e) => toggleWishlist(e, product.id)}
                >
                  <Heart
                    size={18}
                    fill={isWishlisted[product.id] ? "currentColor" : "none"}
                  />
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
          ))}
        </div>
      </div>

      <style>{`
        .new-section {
          background: var(--color-bg, #f2f2f2);
          padding: 5rem 0;
          overflow: hidden;
        }

        .new-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 6vw;
        }

        .new-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .new-title-wrapper {
          display: flex;
          align-items: flex-start;
        }

        .new-title {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .new-accent {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #0a0a0a;
          line-height: 1;
        }

        .new-subtitle {
          font-size: 0.9rem;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0.05em;
          color: rgba(10, 10, 10, 0.5);
        }

        .new-view-all {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #0a0a0a;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          background: #d2ff00;
          padding: 0.75rem 1.25rem;
          border-radius: 0;
        }

        .new-view-all:hover {
          gap: 0.75rem;
          background: #0a0a0a;
          color: #fff;
        }

        .new-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 280px;
          grid-auto-flow: dense;
          gap: 1rem;
        }

        .new-card {
          position: relative;
          border-radius: 0;
          overflow: hidden;
          background: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: none;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .new-card:hover {
          border-color: #d2ff00;
        }

        /* Bento grid variations */
        .new-card-large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .new-card-tall {
          grid-column: span 1;
          grid-row: span 2;
        }

        .new-card-wide {
          grid-column: span 2;
          grid-row: span 1;
        }

        .new-card-normal {
          grid-column: span 1;
          grid-row: span 1;
        }

        .new-card-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .new-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .new-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.7) 100%
          );
          pointer-events: none;
        }

        .new-wishlist {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          color: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .new-card:hover .new-wishlist {
          opacity: 1;
        }

        .new-wishlist:hover {
          background: #d2ff00;
        }

        .new-wishlist.active {
          color: #e91e12;
          background: #fff;
        }

        .new-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.4rem 0.8rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 0;
          background: #d2ff00;
          color: #000;
        }

        .new-card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem;
          color: #fff;
          z-index: 2;
        }

        .new-brand {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #d2ff00;
          margin-bottom: 0.25rem;
        }

        .new-name {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-transform: none;
          letter-spacing: 0;
        }

        .new-card-large .new-name {
          font-size: 1.25rem;
        }

        .new-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .new-shop-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .new-card:hover .new-shop-link {
          color: #d2ff00;
          gap: 0.6rem;
        }

        @media (max-width: 1200px) {
          .new-bento-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 250px;
          }

          .new-card-large {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        @media (max-width: 900px) {
          .new-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 220px;
            gap: 1rem;
          }

          .new-card-large {
            grid-column: span 2;
            grid-row: span 2;
          }

          .new-card-wide {
            grid-column: span 2;
          }

          .new-card-tall {
            grid-row: span 2;
          }
        }

        @media (max-width: 768px) {
          .new-section {
            padding: 3rem 0;
          }

          .new-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          .new-title {
            font-size: 10vw;
          }

          .new-subtitle {
            font-size: 0.8rem;
          }

          .new-wishlist {
            opacity: 1;
          }

          .new-view-all {
            width: 100%;
            justify-content: center;
          }

          .new-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: 0.75rem;
          }

          .new-card-large {
            grid-column: span 2;
            grid-row: span 2;
          }

          .new-card-wide {
            grid-column: span 2;
          }

          .new-card-tall {
            grid-row: span 2;
          }

          .new-card-info {
            padding: 1rem;
          }

          .new-brand {
            font-size: 0.6rem;
          }

          .new-name {
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
            -webkit-line-clamp: 1;
          }

          .new-card-large .new-name {
            font-size: 1rem;
            -webkit-line-clamp: 2;
          }

          .new-price {
            font-size: 0.9rem;
          }

          .new-shop-link {
            font-size: 0.65rem;
          }

          .new-badge {
            padding: 0.3rem 0.6rem;
            font-size: 0.55rem;
          }

          .new-wishlist {
            width: 32px;
            height: 32px;
            top: 0.5rem;
            right: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .new-section {
            padding: 2.5rem 0;
          }

          .new-container {
            padding: 0 4vw;
          }

          .new-header {
            margin-bottom: 1.5rem;
          }

          .new-title {
            font-size: 12vw;
          }

          .new-bento-grid {
            grid-auto-rows: 180px;
            gap: 0.5rem;
          }

          .new-card-info {
            padding: 0.75rem;
          }

          .new-name {
            font-size: 0.75rem;
          }

          .new-card-large .new-name {
            font-size: 0.9rem;
          }

          .new-price {
            font-size: 0.85rem;
          }

          .new-card-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default NewSection;
