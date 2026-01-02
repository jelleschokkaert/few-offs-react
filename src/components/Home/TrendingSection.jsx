import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../../data/products";

const TrendingSection = () => {
  const [isWishlisted, setIsWishlisted] = useState({});
  const scrollRef = useRef(null);

  // Show all products for now
  const trendingProducts = products;

  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const scroll = (direction) => {
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
  };

  if (trendingProducts.length === 0) return null;

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
              {trendingProducts.map((product, index) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="trending-card-new"
                >
                  <div className="trending-card-inner">
                    <div className="trending-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading={index < 4 ? "eager" : "lazy"}
                      />
                      <div className="trending-image-overlay"></div>
                      <button
                        className={`trending-wishlist ${isWishlisted[product.id] ? "active" : ""}`}
                        onClick={(e) => toggleWishlist(e, product.id)}
                      >
                        <Heart
                          size={18}
                          fill={
                            isWishlisted[product.id] ? "currentColor" : "none"
                          }
                        />
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

      <style>{`
        .trending-section {
          position: relative;
          background: #0a0a0a;
          padding: 5rem 0;
          overflow: hidden;
        }

        .trending-bg-pattern {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(210, 255, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(210, 255, 0, 0.02) 0%, transparent 50%);
          pointer-events: none;
        }

        .trending-container {
          position: relative;
          z-index: 1;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 6vw;
        }

        .trending-header {
          margin-bottom: 2rem;
        }

        .trending-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 0.85;
          position: relative;
        }

        .trending-accent {
          color: #d2ff00;
          position: relative;
          display: inline-block;
          text-shadow:
            -1px -1px 0 #fff,
            1px -1px 0 #fff,
            -1px 1px 0 #fff,
            1px 1px 0 #fff,
            0 0 8px rgba(210, 255, 0, 0.5);
        }

        .trending-carousel-wrapper {
          display: flex;
          align-items: stretch;
          gap: 1rem;
        }

        .trending-arrow-spacer {
          flex-shrink: 0;
          width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trending-main {
          flex: 1;
          min-width: 0;
        }

        .trending-arrow {
          flex-shrink: 0;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: color 0.3s ease, transform 0.3s ease;
          padding: 0.5rem;
        }

        .trending-arrow:hover {
          color: #d2ff00;
          transform: scale(1.1);
        }

        .trending-cards {
          display: flex;
          gap: 1rem;
          overflow-x: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          flex: 1;
          scroll-behavior: smooth;
        }

        .trending-cards::-webkit-scrollbar {
          display: none;
        }

        .trending-card-new {
          flex: 0 0 calc((100% - 3rem) / 4);
          scroll-snap-align: start;
          position: relative;
          border-radius: 0;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .trending-card-inner {
          background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
          border-radius: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
          height: 100%;
        }

        .trending-card-new:hover .trending-card-inner {
          border-color: #d2ff00;
        }

        .trending-image-container {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }

        .trending-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .trending-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          pointer-events: none;
        }

        .trending-wishlist {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .trending-card-new:hover .trending-wishlist {
          opacity: 1;
        }

        .trending-wishlist:hover {
          background: rgba(210, 255, 0, 0.2);
          border-color: rgba(210, 255, 0, 0.5);
        }

        .trending-wishlist.active {
          color: #d2ff00;
          background: rgba(210, 255, 0, 0.2);
        }

        .trending-badge {
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

        .trending-card-content {
          padding: 1.25rem;
        }

        .trending-brand {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #d2ff00;
          margin-bottom: 0.5rem;
        }

        .trending-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-transform: none;
          letter-spacing: 0;
        }

        .trending-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .trending-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }

        @media (max-width: 1200px) {
          .trending-card-new {
            flex: 0 0 calc((100% - 2rem) / 3);
          }
        }

        @media (max-width: 900px) {
          .trending-card-new {
            flex: 0 0 calc((100% - 1rem) / 2);
          }
        }

        @media (max-width: 768px) {
          .trending-section {
            padding: 3rem 0;
          }

          .trending-title {
            font-size: 10vw;
          }

          .trending-arrow-spacer {
            display: none;
          }

          .trending-cards {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }

          .trending-card-new {
            flex: 0 0 calc((100% - 1rem) / 2);
          }

          .trending-wishlist {
            opacity: 1;
          }

          .trending-card-content {
            padding: 1rem;
          }

          .trending-name {
            font-size: 0.85rem;
            -webkit-line-clamp: 1;
          }

          .trending-price {
            font-size: 1rem;
          }

          .trending-brand {
            font-size: 0.6rem;
          }

          .trending-badge {
            padding: 0.3rem 0.6rem;
            font-size: 0.55rem;
          }

          .trending-image-container {
            aspect-ratio: 3 / 4;
          }
        }

        @media (max-width: 480px) {
          .trending-section {
            padding: 2.5rem 0;
          }

          .trending-container {
            padding: 0 4vw;
          }

          .trending-header {
            margin-bottom: 1.5rem;
          }

          .trending-title {
            font-size: 12vw;
          }

          .trending-cards {
            gap: 0.75rem;
          }

          .trending-card-new {
            flex: 0 0 calc((100% - 0.75rem) / 2);
          }

          .trending-card-content {
            padding: 0.75rem;
          }

          .trending-name {
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
          }

          .trending-price {
            font-size: 0.9rem;
          }

          .trending-wishlist {
            width: 32px;
            height: 32px;
            top: 0.5rem;
            right: 0.5rem;
          }

          .trending-badge {
            top: 0.5rem;
            left: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;
