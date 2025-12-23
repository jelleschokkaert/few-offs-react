import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const heroSectionRef = useRef(null);
    const heroVideoRef = useRef(null);

    useEffect(() => {
        const heroSection = heroSectionRef.current;
        const heroVideo = heroVideoRef.current;

        if (!heroSection || !heroVideo) return;

        const handleMouseMove = (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

            heroVideo.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        };

        const handleMouseLeave = () => {
            heroVideo.style.transform = "scale(1.05) translate(0, 0)";
        };

        heroSection.addEventListener("mousemove", handleMouseMove);
        heroSection.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            heroSection.removeEventListener("mousemove", handleMouseMove);
            heroSection.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const scrollToProducts = (e) => {
        e.preventDefault();
        const element = document.getElementById('shop-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" ref={heroSectionRef} style={{ height: '60vh', minHeight: '500px' }}>
            <div className="hero-visual-layer">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                    ref={heroVideoRef}
                >
                    <source src="/herovideo1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="hero-content-layer">
                <h1 className="hero-headline" style={{ fontSize: '6vw' }}>
                    <span className="line-1">New Season</span>
                    <span className="line-2">Arrivals</span>
                </h1>
                <div className="hero-meta" style={{ marginTop: '2rem' }}>
                    <a href="#shop-section" onClick={scrollToProducts} className="btn-cta">Shop Collection</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
