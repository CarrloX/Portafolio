import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Counter from "./components/Counter";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";

// Import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "boxicons/css/boxicons.min.css";
import "./index.css";

// Import JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (globalThis.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    globalThis.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="portfolio-app">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Counter />
        <Portfolio />
      </main>

      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="btn-back_to_top"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <i className="bx bx-up-arrow-alt"></i>
        </button>
      )}
    </div>
  );
};

export default App;
