import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const NotFoundPage = () => {
    return (
        <>
            <Navbar />
            <main className="not-found-page container">
                <div className="not-found-content">
                    <h1 className="not-found-title">404</h1>
                    <h2 className="not-found-subtitle">Page Not Found</h2>
                    <p className="not-found-text">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/" className="btn-cta">
                        Back to Home
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default NotFoundPage;
