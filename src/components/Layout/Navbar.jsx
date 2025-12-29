import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { navData } from '../../data/navData';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleMouseEnter = (menu) => {
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const promoTexts = [
        "Receive 20% off your first order.",
        "Free shipping on orders over €100."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromoIndex((prev) => (prev + 1) % promoTexts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
                {/* Top Utility Bar */}
                <div className="top-bar">
                    <div className="container top-bar-inner">
                        <div className="top-bar-left">
                            <span key={currentPromoIndex} className="promo-text fade-in">
                                {promoTexts[currentPromoIndex]}
                            </span>
                        </div>
                        <div className="top-bar-right">
                            <a href="#">Partners</a>
                            <span>|</span>
                            <a href="#">Help</a>
                            <span>|</span>
                            <a href="#">Language</a>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Bar */}
                <div className="main-nav">
                    <div className="container main-nav-inner">
                        <Link to="/" className="logo">FEW-OFFS</Link>

                        <nav className="desktop-nav">
                            <div
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('men')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/men" className="nav-link">Men</Link>
                                <MegaMenu
                                    data={navData.men}
                                    isVisible={activeMenu === 'men'}
                                />
                            </div>
                            <div
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('women')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/women" className="nav-link">Women</Link>
                                <MegaMenu
                                    data={navData.women}
                                    isVisible={activeMenu === 'women'}
                                />
                            </div>
                            <div
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter('kids')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/kids" className="nav-link">Kids</Link>
                                <MegaMenu
                                    data={navData.kids}
                                    isVisible={activeMenu === 'kids'}
                                />
                            </div>
                            <div className="nav-item">
                                <Link to="/brands" className="nav-link">Brands</Link>
                            </div>
                        </nav>

                        <div className="nav-actions">
                            <div className="search-bar">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input type="text" placeholder="Search" />
                            </div>
                            <Link to="/wishlist" className="icon-btn" aria-label="Favorites">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </Link>
                            <Link to="/cart" className="icon-btn" aria-label="Cart">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </Link>
                            <Link to="/login" className="icon-btn" aria-label="Profile">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </Link>
                            <button
                                className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                                aria-label="Toggle menu"
                                onClick={toggleMenu}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-inner">
                    <div className="mobile-menu-header">
                        <span className="mobile-logo">FEW-OFFS</span>
                        <button
                            className="mobile-menu-close"
                            aria-label="Close menu"
                            onClick={closeMenu}
                        >
                            &times;
                        </button>
                    </div>

                    <div className="mobile-search-container">
                        <div className="mobile-search-input-wrapper">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" placeholder="Search product..." />
                        </div>
                    </div>

                    <div className="mobile-menu-content">
                        <nav className="mobile-nav-main">
                            <Link to="/women" onClick={closeMenu}>WOMEN</Link>
                            <Link to="/men" onClick={closeMenu}>MEN</Link>
                            <Link to="/kids" onClick={closeMenu}>KIDS</Link>
                            <Link to="/brands" onClick={closeMenu}>BRANDS</Link>
                            <Link to="/wishlist" onClick={closeMenu}>WISHLIST</Link>
                            <Link to="/login" onClick={closeMenu}>LOGIN</Link>
                            <Link to="/cart" onClick={closeMenu}>CART</Link>
                        </nav>
                    </div>

                    <div className="mobile-socials">
                        <a href="#" aria-label="Instagram">Instagram</a>
                        <a href="#" aria-label="TikTok">TikTok</a>
                        <a href="#" aria-label="Twitter">Twitter</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
