import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { products } from "../../data/products";

const ForYouSection = () => {
  const [isWishlisted, setIsWishlisted] = useState({});

  // Use all products for For You section
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

  return (
    <section className="foryou-section">
      <div className="foryou-container">
        <div className="foryou-header">
          <h2 className="foryou-title">
            <span className="foryou-accent">For You</span>
          </h2>
          <Link to="/men" className="foryou-view-all">
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="foryou-grid">
          {displayProducts.slice(0, 8).map((product, index) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="foryou-card"
            >
              <div className="foryou-card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <button
                  className={`foryou-wishlist ${isWishlisted[product.id] ? "active" : ""}`}
                  onClick={(e) => toggleWishlist(e, product.id)}
                >
                  <Heart
                    size={18}
                    fill={isWishlisted[product.id] ? "currentColor" : "none"}
                  />
                </button>
                {product.badge && (
                  <span className="foryou-badge">{product.badge}</span>
                )}
              </div>
              <div className="foryou-card-info">
                <span className="foryou-brand">{product.brand}</span>
                <h3 className="foryou-name">{product.name}</h3>
                <span className="foryou-price">€{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .foryou-section {
          background: #f2f2f2;
          padding: 4rem 0;
        }

        .foryou-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 6vw;
        }

        .foryou-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .foryou-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #0a0a0a;
          line-height: 0.85;
        }

        .foryou-accent {
          color: #d2ff00;
          position: relative;
          display: inline-block;
          text-shadow:
            -1px -1px 0 #0a0a0a,
            1px -1px 0 #0a0a0a,
            -1px 1px 0 #0a0a0a,
            1px 1px 0 #0a0a0a,
            0 0 8px rgba(210, 255, 0, 0.5);
        }

        .foryou-view-all {
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

        .foryou-view-all:hover {
          gap: 0.75rem;
          background: #0a0a0a;
          color: #fff;
        }

        .foryou-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .foryou-card {
          position: relative;
          background: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .foryou-card:hover {
          border-color: #d2ff00;
        }

        .foryou-card-image {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }

        .foryou-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .foryou-wishlist {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
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

        .foryou-card:hover .foryou-wishlist {
          opacity: 1;
        }

        .foryou-wishlist:hover {
          background: #d2ff00;
        }

        .foryou-wishlist.active {
          color: #e91e12;
          opacity: 1;
        }

        .foryou-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          padding: 0.4rem 0.8rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #d2ff00;
          color: #000;
        }

        .foryou-card-info {
          padding: 1rem;
        }

        .foryou-brand {
          display: block;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(10, 10, 10, 0.5);
          margin-bottom: 0.25rem;
        }

        .foryou-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #0a0a0a;
          line-height: 1.3;
          text-transform: none;
          letter-spacing: 0;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .foryou-price {
          font-size: 1rem;
          font-weight: 700;
          color: #0a0a0a;
        }

        @media (max-width: 1200px) {
          .foryou-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .foryou-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .foryou-section {
            padding: 3rem 0;
          }

          .foryou-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .foryou-title {
            font-size: 10vw;
          }

          .foryou-grid {
            gap: 0.75rem;
          }

          .foryou-wishlist {
            opacity: 1;
            width: 32px;
            height: 32px;
            top: 0.5rem;
            right: 0.5rem;
          }

          .foryou-badge {
            padding: 0.3rem 0.6rem;
            font-size: 0.55rem;
            top: 0.5rem;
            left: 0.5rem;
          }

          .foryou-view-all {
            width: 100%;
            justify-content: center;
          }

          .foryou-card-info {
            padding: 0.75rem;
          }

          .foryou-brand {
            font-size: 0.6rem;
          }

          .foryou-name {
            font-size: 0.8rem;
            -webkit-line-clamp: 1;
            margin-bottom: 0.25rem;
          }

          .foryou-price {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .foryou-section {
            padding: 2.5rem 0;
          }

          .foryou-container {
            padding: 0 4vw;
          }

          .foryou-title {
            font-size: 12vw;
          }

          .foryou-grid {
            gap: 0.5rem;
          }

          .foryou-card-info {
            padding: 0.6rem;
          }

          .foryou-name {
            font-size: 0.75rem;
          }

          .foryou-price {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ForYouSection;
