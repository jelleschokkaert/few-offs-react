import React from "react";
import ShopProductCard from "../UI/ShopProductCard";
import { products } from "../../data/products";

const HomeShopGrid = () => {
  return (
    <section
      id="shop-section"
      className="container"
      style={{ paddingBottom: "4rem", paddingTop: "4rem" }}
    >
      <div className="section-header" style={{ marginBottom: "2rem" }}>
        <h2 className="section-title">
          Latest <span>Drops</span>
        </h2>
      </div>

      <div className="shop-grid">
        {products.map((product, index) => (
          <ShopProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            brand={product.brand}
            name={product.name}
            badge={product.badge}
            price={product.price}
            priority={index < 6}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeShopGrid;
