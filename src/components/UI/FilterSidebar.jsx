import React, { useState } from 'react';

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="filter-group">
            <button
                className={`filter-header ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <span className="filter-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`filter-content ${isOpen ? 'open' : ''}`}>
                <div className="filter-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
};

const FilterSidebar = ({ filters, activeFilters, onFilterChange }) => {
    return (
        <aside className="filter-sidebar">
            <div className="filter-sidebar-header">
                <h3>Filters</h3>
            </div>

            <FilterSection title="Price Range">
                <div className="filter-options">
                    {filters.priceRanges.map(range => (
                        <label key={range.label} className="filter-option radio">
                            <input
                                type="radio"
                                name="price"
                                checked={activeFilters.priceRange === range.value}
                                onChange={() => onFilterChange('priceRange', range.value)}
                            />
                            <span className="custom-radio"></span>
                            <span className="label-text">{range.label}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Brands">
                <div className="filter-options">
                    {filters.brands.map(brand => (
                        <label key={brand} className="filter-option checkbox">
                            <input
                                type="checkbox"
                                checked={activeFilters.brands.includes(brand)}
                                onChange={() => onFilterChange('brands', brand)}
                            />
                            <span className="custom-checkbox"></span>
                            <span className="label-text">{brand}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {filters.sizes && (
                <FilterSection title="Size">
                    <div className="filter-options grid-options">
                        {filters.sizes.map(size => (
                            <label key={size} className={`filter-chip ${activeFilters.sizes?.includes(size) ? 'active' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={activeFilters.sizes?.includes(size) || false}
                                    onChange={() => onFilterChange('sizes', size)}
                                />
                                <span>{size}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}

            {filters.colors && (
                <FilterSection title="Color">
                    <div className="filter-options">
                        {filters.colors.map(color => (
                            <label key={color} className="filter-option checkbox">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.colors?.includes(color) || false}
                                    onChange={() => onFilterChange('colors', color)}
                                />
                                <span className="custom-checkbox"></span>
                                <span className="label-text">{color}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}
        </aside>
    );
};

export default FilterSidebar;
