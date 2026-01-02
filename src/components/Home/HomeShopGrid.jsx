import React from "react";
import TrendingSection from "./TrendingSection";
import NewSection from "./NewSection";
import ForYouSection from "./ForYouSection";

const HomeShopGrid = () => {
  return (
    <div id="shop-section">
      <NewSection />
      <TrendingSection />
      <ForYouSection />
    </div>
  );
};

export default HomeShopGrid;
