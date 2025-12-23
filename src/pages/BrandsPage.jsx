import React, { useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { products } from '../data/products';

const BrandsPage = () => {
    // Extract unique brands and sort alphabetically
    const brands = [...new Set(products.map(product => product.brand))].sort();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <main className="brands-page container">
                <div className="brands-header">
                    <h1>Brands</h1>
                    <p className="brands-subtitle">Curated Selection</p>
                </div>

                <div className="brands-grid">
                    {brands.map((brand, index) => (
                        <div key={index} className="brand-item">
                            <span className="brand-name">{brand}</span>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BrandsPage;
