import React, { useEffect } from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import ShopProductCard from "../components/UI/ShopProductCard";
import Breadcrumbs from "../components/UI/Breadcrumbs";
import { products } from "../data/products";

const WishlistPage = () => {
    // Mock wishlist items (first 4 products)
    const wishlistItems = products.slice(0, 4);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <div
                className="container"
                style={{
                    paddingTop: "8rem",
                    minHeight: "100vh",
                    paddingBottom: "4rem",
                }}
            >
                <Breadcrumbs />

                <div className="page-header category-page-header">
                    <h1 className="category-title">Your Wishlist</h1>
                    <p className="category-description">
                        Save your favorite items here and review them anytime.
                    </p>
                </div>

                <div className="category-content-wrapper">
                    <div className="product-listing-container" style={{ width: "100%" }}>
                        <div className="category-header-row">
                            <span className="result-count">
                                {wishlistItems.length} items saved
                            </span>
                        </div>

                        <div className="shop-grid">
                            {wishlistItems.length > 0 ? (
                                wishlistItems.map((product) => (
                                    <ShopProductCard
                                        key={product.id}
                                        id={product.id}
                                        image={product.image}
                                        brand={product.brand}
                                        name={product.name}
                                        badge={product.badge}
                                        price={product.price}
                                    />
                                ))
                            ) : (
                                <div className="no-products-message">
                                    <p>Your wishlist is empty.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WishlistPage;
