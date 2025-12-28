import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Detect system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsOverDark(isIntersecting);
      },
      {
        rootMargin: "-20px 0px -50% 0px", // More generous margin to detect the background
        threshold: 0,
      }
    );

    const darkSections = document.querySelectorAll(
      '[data-section-theme="dark"]'
    );
    darkSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      data-navbar-mode={theme === "dark" || isOverDark ? "dark" : "light"}
      className={`navbar navbar-expand-lg ${isSticky ? "navbar-sticky" : ""}`}
    >
      <div className="container d-flex justify-content-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
        >
          <span className="bx bx-menu"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="main-navbar"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
              >
                Info
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#portfolio"
                onClick={(e) => scrollToSection(e, "portfolio")}
              >
                Portafolio
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
              >
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Cambiar tema"
              >
                <i
                  className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"}`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
