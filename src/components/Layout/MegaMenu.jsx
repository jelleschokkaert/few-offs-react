import React from "react";
import { Link } from "react-router-dom";

const MegaMenu = ({ data, isVisible }) => {
  if (!isVisible || !data) return null;

  return (
    <div className="mega-menu">
      <div className="mega-menu-content">
        {data.map((column, index) => (
          <div key={index} className="mega-menu-column">
            <h4 className="mega-menu-title">{column.title}</h4>
            <ul className="mega-menu-list">
              {column.links.map((link, i) => (
                <li key={i}>
                  <Link to="#" className="mega-menu-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
