import React, { memo } from "react";

const Hero = () => {
  const scrollToProducts = (e) => {
    e.preventDefault();
    const element = document.getElementById("shop-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" style={{ height: "60vh", minHeight: "500px" }}>
      <div className="hero-visual-layer">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          preload="metadata"
        >
          <source src="/herovideo1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hero-content-layer">
        <h1 className="hero-headline" style={{ fontSize: "6vw" }}>
          <span className="line-1">New Season</span>
          <span className="line-2">Arrivals</span>
        </h1>
        <div className="hero-meta" style={{ marginTop: "2rem" }}>
          <a
            href="#shop-section"
            onClick={scrollToProducts}
            className="btn-cta"
          >
            Shop Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
