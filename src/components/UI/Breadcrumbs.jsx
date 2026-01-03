import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ customItems }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Format path segment for display (e.g., "account" -> "Account", "my-orders" -> "My Orders")
  const formatSegment = (segment) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // If custom items are provided, use those instead of auto-generated breadcrumbs
  const items =
    customItems ||
    pathnames.map((name, index) => ({
      label: formatSegment(name),
      path: `/${pathnames.slice(0, index + 1).join("/")}`,
      isLast: index === pathnames.length - 1,
    }));

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ol className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link to="/" className="breadcrumbs-link">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.path || index} className="breadcrumbs-item">
            <span className="breadcrumbs-separator">/</span>
            {item.isLast ? (
              <span className="breadcrumbs-current">{item.label}</span>
            ) : (
              <Link to={item.path} className="breadcrumbs-link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
