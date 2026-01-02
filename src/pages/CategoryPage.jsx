import React, { useState, useMemo } from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import ShopProductCard from "../components/UI/ShopProductCard";
import Breadcrumbs from "../components/UI/Breadcrumbs";
import FilterSidebar from "../components/UI/FilterSidebar";
import SortDropdown from "../components/UI/SortDropdown";
import { products } from "../data/products";

const CategoryPage = ({ category }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    priceRange: "all",
    sizes: [],
    colors: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [category],
  );

  const filters = useMemo(() => {
    const brands = [...new Set(categoryProducts.map((p) => p.brand))];
    const sizes = [...new Set(categoryProducts.flatMap((p) => p.sizes || []))];
    const colors = [
      ...new Set(categoryProducts.map((p) => p.color).filter(Boolean)),
    ];

    return {
      brands,
      sizes: sizes.sort(),
      colors: colors.sort(),
      priceRanges: [
        { label: "All Prices", value: "all" },
        { label: "Under €100", value: "under-100" },
        { label: "€100 - €300", value: "100-300" },
        { label: "Over €300", value: "over-300" },
      ],
    };
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (activeFilters.brands.length > 0) {
      result = result.filter((p) => activeFilters.brands.includes(p.brand));
    }

    if (activeFilters.sizes.length > 0) {
      result = result.filter(
        (p) => p.sizes && p.sizes.some((s) => activeFilters.sizes.includes(s)),
      );
    }

    if (activeFilters.colors.length > 0) {
      result = result.filter((p) => activeFilters.colors.includes(p.color));
    }

    if (activeFilters.priceRange !== "all") {
      switch (activeFilters.priceRange) {
        case "under-100":
          result = result.filter((p) => p.price < 100);
          break;
        case "100-300":
          result = result.filter((p) => p.price >= 100 && p.price <= 300);
          break;
        case "over-300":
          result = result.filter((p) => p.price > 300);
          break;
      }
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [categoryProducts, activeFilters, sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterChange = (type, value) => {
    setCurrentPage(1);
    if (type === "brands" || type === "sizes" || type === "colors") {
      setActiveFilters((prev) => {
        const current = prev[type] || [];
        const updated = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...prev, [type]: updated };
      });
    } else if (type === "priceRange") {
      setActiveFilters((prev) => ({ ...prev, priceRange: value }));
    }
  };

  const handleSortChange = (value) => {
    setCurrentPage(1);
    setSortBy(value);
  };

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h1 className="category-title">{capitalize(category)}</h1>
          <p className="category-description">
            Explore our exclusive collection for {category}. Curated for the
            modern streetwear enthusiast.
          </p>
        </div>

        <button
          className="mobile-filter-toggle"
          onClick={() => setIsFilterOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filters
        </button>

        <div className="category-content-wrapper">
          <div
            className={`filter-sidebar-wrapper ${isFilterOpen ? "open" : ""}`}
          >
            <div className="mobile-filter-header">
              <h3>Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>&times;</button>
            </div>
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
            <button
              className="mobile-apply-btn"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>

          {isFilterOpen && (
            <div
              className="mobile-filter-overlay"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          <div className="product-listing-container">
            <div className="category-header-row">
              <SortDropdown
                value={sortBy}
                onChange={handleSortChange}
                options={[
                  { value: "newest", label: "Newest Arrivals" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                ]}
              />
              <span className="result-count">
                Showing {currentProducts.length} of {filteredProducts.length}{" "}
                results
              </span>
            </div>

            <div className="shop-grid">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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
                <p className="no-products-message">
                  No products found matching your filters.
                </p>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`page-btn ${
                      currentPage === idx + 1 ? "active" : ""
                    }`}
                    onClick={() => paginate(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="page-btn"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
