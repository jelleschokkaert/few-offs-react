import React, { useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Breadcrumbs from "../components/UI/Breadcrumbs";

const brandFiles = [
  "diesel-jeans.svg",
  "pepe-jeans-1.svg",
  "diesel-3.svg",
  "mango-4.svg",
  "bershka-1.svg",
  "pull-bear-2.svg",
  "billabong-2008.svg",
  "asics-6.svg",
  "adidas-18.svg",
  "nike-4-2.svg",
  "stussy-1.svg",
  "jb-1.svg"
];

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadBrands = async () => {
      const loadedBrands = await Promise.all(
        brandFiles.map(async (file) => {
          try {
            const response = await fetch(`/brands/${file}`);
            const text = await response.text();
            return { name: file.replace(".svg", "").replace(/-/g, " ").replace(/\d+/g, "").trim(), svg: text };
          } catch (e) {
            return null;
          }
        })
      );
      setBrands(loadedBrands.filter(Boolean));
      setLoaded(true);
    };

    loadBrands();
  }, []);

  return (
    <>
      <Navbar />
      <main className="brands-page container">
        <Breadcrumbs />
        <div className="brands-header">
          <h1 className="brands-title">Brands</h1>
          <p className="brands-subtitle">Curated Selection</p>
        </div>

        <div className={`brands-grid ${loaded ? "loaded" : ""}`}>
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="brand-card"
              style={{ "--delay": `${index * 0.1}s` }}
            >
              <div className="brand-card-inner">
                <div className="brand-logo-wrapper">
                  <div className="brand-logo-inner">
                    <div 
                      className="brand-logo"
                      dangerouslySetInnerHTML={{ __html: brand.svg }}
                    />
                  </div>
                </div>
                <span className="brand-name">{brand.name}</span>
              </div>
              <div className="brand-glow"></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BrandsPage;
