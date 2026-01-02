import React, { memo } from "react";

const Concept = () => {
  return (
    <section className="concept-section container">
      <div className="concept-content">
        <h2 className="section-title">
          The <span>Concept</span>
        </h2>
        <p className="concept-text">
          Few-offs is not just a store. It&apos;s a curated archive of the
          underground. We source limited runs, deadstock, and emerging designer
          pieces that you won&apos;t find on the high street.
          <br />
          <br />
          Every item has a story. Every drop is limited. Once it&apos;s gone,
          it&apos;s gone.
        </p>
        <a href="#" className="btn-cta">
          Read Our Story
        </a>
      </div>
      <div className="concept-visual">
        <img
          src="/pexels-rimiscky-34887628.jpg"
          alt="Concept Visual"
          className="concept-img"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default memo(Concept);
