import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Home/Hero';
import HomeShopGrid from './components/Home/HomeShopGrid';
import BrandsMarquee from './components/Home/BrandsMarquee';
import Concept from './components/Home/Concept';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandsPage from './pages/BrandsPage';
import { products } from './data/products';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <HomeShopGrid />
    <BrandsMarquee />
    <Concept />
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/men" element={<CategoryPage category="men" />} />
      <Route path="/women" element={<CategoryPage category="women" />} />
      <Route path="/kids" element={<CategoryPage category="kids" />} />
      <Route path="/brands" element={<BrandsPage />} />
    </Routes>
  );
}

export default App;
