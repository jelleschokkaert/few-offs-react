import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="breadcrumbs" aria-label="breadcrumb">
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 600 }}>
                <li>
                    <Link to="/" style={{ opacity: 0.6, color: 'var(--color-text)' }}>Home</Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={name} style={{ display: 'flex', gap: '0.5rem' }}>
                            <span style={{ opacity: 0.4 }}>/</span>
                            {isLast ? (
                                <span style={{ color: 'var(--color-text)' }}>{name}</span>
                            ) : (
                                <Link to={routeTo} style={{ opacity: 0.6 }}>{name}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
