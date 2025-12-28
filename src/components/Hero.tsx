import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portada from "../assets/img/portada.webp";

const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <div
      className="page-home"
      id="home"
      ref={ref}
      data-section-theme="dark"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        style={{
          backgroundImage: `url(${portada})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: "-25%",
          left: 0,
          right: 0,
          bottom: "-25%",
          y: backgroundY,
          zIndex: 0,
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          className="caption-header text-center animate__animated animate__zoomIn"
          style={{ y: textY }}
        >
          <h5 className="fw-bold">Bienvenido</h5>
          <h1 className="fw-bold mb-4">
            Yo soy <b className="fg-theme">Carlos</b> Ramirez
          </h1>
          <div className="badge">Programador en Desarrollo</div>
        </motion.div>
      </div>
      <div className="floating-button">
        <span className="bx bx-mouse bx-md"></span>
      </div>
    </div>
  );
};

export default Hero;
