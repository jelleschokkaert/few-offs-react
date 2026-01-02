import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import ShopProductCard from "../components/UI/ShopProductCard";
import { ChevronDown, ChevronUp, ShoppingBag, Heart } from "lucide-react";

const InfoSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="info-section">
      <button className="info-toggle" onClick={onToggle}>
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && <div className="info-content">{children}</div>}
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useMemo(
    () => products.find((p) => p.id === parseInt(id)),
    [id],
  );

  const images = useMemo(
    () => (product ? product.images || [product.image] : []),
    [product],
  );

  const colors = useMemo(
    () =>
      product ? product.colors || [{ name: product.color, value: "#000" }] : [],
    [product],
  );

  const defaultColor = useMemo(
    () =>
      product
        ? product.colors && product.colors.length > 0
          ? product.colors[0].name
          : product.color
        : "",
    [product],
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(product?.image || "");
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [openSection, setOpenSection] = useState("description");

  // Scroll to top when navigating to a new product
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Reset selections when product changes
  const productId = product?.id;
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors?.[0]?.name || product.color || "");
      setSelectedSize("");
    }
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!product) {
    return (
      <div className="product-page-error">
        <Navbar />
        <div className="error-content">
          <h2>Product not found</h2>
          <Link to="/">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-page container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-main-content">
          <div className="product-gallery">
            <div className="main-image-wrapper">
              {activeImage && (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="main-image"
                />
              )}
              {product.badge && (
                <span className="product-badge-detail">{product.badge}</span>
              )}
            </div>

            {images.length > 1 && (
              <div className="product-thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`thumbnail-btn ${activeImage === img ? "active" : ""}`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-details-panel">
            <span className="detail-brand">{product.brand}</span>
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-price">€{product.price}</p>

            <div className="color-selector">
              <span className="selector-label">
                Color: <span className="selected-value">{selectedColor}</span>
              </span>
              <div className="color-options">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`color-btn ${selectedColor === c.name ? "active" : ""}`}
                    title={c.name}
                  >
                    <span
                      className="color-swatch-inner"
                      style={{ backgroundColor: c.value }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="size-selector">
              <div className="size-header">
                <span className="selector-label">Size</span>
                <button className="size-guide-btn">Size Guide</button>
              </div>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-actions">
              <button
                className={`btn-cta btn-add-cart ${!selectedSize ? "disabled" : ""}`}
                disabled={!selectedSize}
              >
                <ShoppingBag size={20} />
                {selectedSize ? "Add to Cart" : "Select a size"}
              </button>
              <button className="btn-wishlist">
                <Heart size={20} />
                Add to wishlist
              </button>
            </div>

            <div className="product-info-sections">
              <InfoSection
                title="About this product"
                isOpen={openSection === "description"}
                onToggle={() => toggleSection("description")}
              >
                <p>
                  {product.description_long ||
                    "This exclusive item is an essential addition to your wardrobe. Made with high-quality materials and attention to detail."}
                </p>
                {product.specifications && (
                  <ul>
                    {product.specifications.map((spec, idx) => (
                      <li key={idx}>
                        <strong>{spec.label}:</strong> {spec.value}
                      </li>
                    ))}
                  </ul>
                )}
              </InfoSection>

              <InfoSection
                title="Material & Care"
                isOpen={openSection === "material"}
                onToggle={() => toggleSection("material")}
              >
                <p>
                  <strong>Material:</strong>{" "}
                  {product.material || "Cotton blend"}
                </p>
                <p>
                  <strong>Care:</strong>{" "}
                  {product.wash_instructions ||
                    "Please refer to the care label for instructions."}
                </p>
              </InfoSection>

              <InfoSection
                title="Fit"
                isOpen={openSection === "fitting"}
                onToggle={() => toggleSection("fitting")}
              >
                <p>
                  {product.fitting ||
                    "This item fits true to size. We recommend ordering your regular size."}
                </p>
              </InfoSection>

              <InfoSection
                title="Shipping & Returns"
                isOpen={openSection === "shipping"}
                onToggle={() => toggleSection("shipping")}
              >
                <p>
                  Order before 10 PM on business days for next-day delivery.
                  Free shipping on orders over €150. You have 14 days to return
                  your order.
                </p>
              </InfoSection>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h3 className="section-title small">You might also like</h3>
            <div className="shop-grid">
              {relatedProducts.map((related) => (
                <ShopProductCard
                  key={related.id}
                  id={related.id}
                  image={related.image}
                  brand={related.brand}
                  name={related.name}
                  badge={related.badge}
                  price={related.price}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
