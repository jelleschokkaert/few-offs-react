import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ShopProductCard from '../components/UI/ShopProductCard';
import { ChevronDown, ChevronUp, ShoppingBag, Heart } from 'lucide-react';

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
    const product = products.find((p) => p.id === parseInt(id));
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(product ? product.image : '');
    const [selectedColor, setSelectedColor] = useState('');
    const [openSection, setOpenSection] = useState('description'); // Default open section

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Set default state when product loads
    useEffect(() => {
        if (product) {
            setActiveImage(product.image);
            setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : product.color);
            setSelectedSize(''); // Reset size
        }
    }, [product]);

    if (!product) {
        return (
            <div className="product-page-error">
                <Navbar />
                <div className="error-content">
                    <h2>Product niet gevonden</h2>
                    <Link to="/">Terug naar home</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Find related products
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const images = product.images || [product.image];
    const colors = product.colors || [{ name: product.color, value: "#000" }];

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
            <Navbar />

            <main className="product-page container">
                {/* Breadcrumb */}
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to={`/${product.category}`}>{product.category}</Link>
                    <span>/</span>
                    <span className="current">{product.name}</span>
                </div>

                <div className="product-main-content">
                    {/* Left: Images */}
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

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="product-thumbnails">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(img)}
                                        className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                                    >
                                        <img src={img} alt={`${product.name} view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="product-details-panel">
                        <span className="detail-brand">{product.brand}</span>
                        <h1 className="detail-name">{product.name}</h1>
                        <p className="detail-price">€{product.price}</p>

                        {/* Color Selector */}
                        <div className="color-selector">
                            <span className="selector-label">Kleur: <span className="selected-value">{selectedColor}</span></span>
                            <div className="color-options">
                                {colors.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedColor(c.name)}
                                        className={`color-btn ${selectedColor === c.name ? 'active' : ''}`}
                                        title={c.name}
                                    >
                                        <span className="color-swatch-inner" style={{ backgroundColor: c.value }}></span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="size-selector">
                            <div className="size-header">
                                <span className="selector-label">Selecteer Maat</span>
                                <button className="size-guide-btn">Maattabel</button>
                            </div>
                            <div className="size-options">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="product-actions">
                            <button
                                className={`btn-cta btn-add-cart ${!selectedSize ? 'disabled' : ''}`}
                                disabled={!selectedSize}
                            >
                                <ShoppingBag size={20} />
                                {selectedSize ? 'In Winkelmand' : 'Selecteer een maat'}
                            </button>
                            <button className="btn-wishlist">
                                <Heart size={20} />
                                Toevoegen aan wishlist
                            </button>
                        </div>

                        {/* Extra Info Accordions */}
                        <div className="product-info-sections">
                            <InfoSection
                                title="Alles over dit product"
                                isOpen={openSection === 'description'}
                                onToggle={() => toggleSection('description')}
                            >
                                <p>{product.description_long || "Dit exclusieve item is een essentieel onderdeel voor je garderobe. Gemaakt met hoogwaardige materialen en oog voor detail."}</p>
                                {product.specifications && (
                                    <ul>
                                        {product.specifications.map((spec, idx) => (
                                            <li key={idx}><strong>{spec.label}:</strong> {spec.value}</li>
                                        ))}
                                    </ul>
                                )}
                            </InfoSection>

                            <InfoSection
                                title="Materiaal & Wasvoorschrift"
                                isOpen={openSection === 'material'}
                                onToggle={() => toggleSection('material')}
                            >
                                <p><strong>Materiaal:</strong> {product.material || "Katoen mix"}</p>
                                <p><strong>Wasvoorschrift:</strong> {product.wash_instructions || "Raadpleeg het waslabel voor instructies."}</p>
                            </InfoSection>

                            <InfoSection
                                title="Fitting"
                                isOpen={openSection === 'fitting'}
                                onToggle={() => toggleSection('fitting')}
                            >
                                <p>{product.fitting || "Dit item valt normaal op maat. We raden je aan je eigen maat te bestellen."}</p>
                            </InfoSection>

                            <InfoSection
                                title="Verzending & Retour"
                                isOpen={openSection === 'shipping'}
                                onToggle={() => toggleSection('shipping')}
                            >
                                <p>Op werkdagen voor 22:00 besteld, morgen in huis. Gratis verzending vanaf €150. Je hebt 14 dagen de tijd om je bestelling te retourneren.</p>
                            </InfoSection>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h3 className="section-title small">Misschien vind je dit ook leuk</h3>
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
