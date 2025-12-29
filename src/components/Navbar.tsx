import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Detect system preference
    return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Most reliable way for emulators: simply check if width is greater than height
      // and we are within the "mobile/tablet" range (less than 1024px or similar)
      const isHorizontal = globalThis.innerWidth > globalThis.innerHeight;
      const isMobileSize = globalThis.innerWidth < 1024;
      setIsLandscape(isHorizontal && isMobileSize);
    };

    checkOrientation();
    globalThis.addEventListener("resize", checkOrientation);
    globalThis.addEventListener("orientationchange", checkOrientation);

    // Check again after a short delay to handle emulator lag
    const timer = setTimeout(checkOrientation, 500);

    return () => {
      globalThis.removeEventListener("resize", checkOrientation);
      globalThis.removeEventListener("orientationchange", checkOrientation);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (globalThis.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
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

      globalThis.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Use a small timeout to ensure the scroll starts before the menu unmounts/re-renders
      setTimeout(() => {
        setIsOpen(false);
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      data-navbar-mode={theme === "dark" || isOverDark ? "dark" : "light"}
      className={`navbar ${
        isLandscape ? "navbar-expand force-desktop" : "navbar-expand-lg"
      } ${isSticky ? "navbar-sticky" : ""}`}
    >
      <div className="container px-0 px-lg-3">
        <div className="navbar-content w-100 position-relative">
          {/* Mobile Toggler (Left) */}
          <div className={`${isLandscape ? "d-none" : "d-lg-none"}`}>
            <button
              className={`navbar-toggler ${isOpen ? "open" : ""}`}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon"></span>
            </button>
          </div>

          {/* Mobile Title (Center) */}
          <div
            className={`${isLandscape ? "d-none" : "d-lg-none"} text-center`}
          >
            <span className="navbar-title-mobile">Portafolio</span>
          </div>

          {/* Desktop Menu */}
          <div
            className={`${
              isLandscape ? "d-block" : "d-none d-lg-block"
            } w-100 desktop-menu-wrapper`}
          >
            <ul className="navbar-nav justify-content-center align-items-center">
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

          {/* Theme Toggle (Mobile) */}
          <div
            className={`${
              isLandscape ? "d-none" : "d-lg-none"
            } flex-grow-1 d-flex justify-content-end`}
          >
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              <i
                className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"}`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Animated) */}
        <AnimatePresence>
          {isOpen && !isLandscape && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mobile-menu d-lg-none w-100 overflow-hidden"
            >
              <ul className="navbar-nav pt-3 pb-2 text-center">
                <li className="nav-item">
                  <a
                    className="nav-link py-3"
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")}
                  >
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3"
                    href="#about"
                    onClick={(e) => scrollToSection(e, "about")}
                  >
                    Info
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3"
                    href="#portfolio"
                    onClick={(e) => scrollToSection(e, "portfolio")}
                  >
                    Portafolio
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link py-3"
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
