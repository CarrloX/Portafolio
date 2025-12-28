import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import galaxy from "../assets/img/galaxy.jpg";

interface AnimatedNumberProps {
  value: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  // Extract number and prefix/suffix (+ or ,)
  const isPlus = value.startsWith("+");
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);

  const [currentValue, setCurrentValue] = useState(0);

  return (
    <motion.h1
      className="number"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
      }}
      onViewportEnter={() => {
        animate(0, numericValue, {
          duration: 2, // 2 seconds for that fast but visible effect
          ease: "easeOut",
          onUpdate: (latest) => setCurrentValue(Math.floor(latest)),
        });
      }}
      viewport={{ once: true }}
    >
      {isPlus ? "+" : ""}
      {currentValue.toLocaleString()}
    </motion.h1>
  );
};

interface CounterItemProps {
  number: string;
  label: string;
}

const CounterItem: React.FC<CounterItemProps> = ({ number, label }) => (
  <div className="col-md-6 col-lg-3 py-4 text-center">
    <AnimatedNumber value={number} />
    <span>{label}</span>
  </div>
);

const Counter: React.FC = () => {
  const stats = [
    { number: "210", label: "Dias Aprendiendo Programacion" },
    { number: "3", label: "Projectos Finalizados" },
    { number: "2000", label: "Frustraciones Superadas" },
    { number: "+10000", label: "Lineas de Codigo escritas" },
  ];

  return (
    <div
      className="vg-page page-funfact section-counter"
      id="funfact"
      data-section-theme="dark"
      style={{
        backgroundImage: `url(${galaxy})`,
        padding: "80px 0",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        position: "relative",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 100 + "%",
          height: 100 + "%",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      ></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row">
          {stats.map((stat) => (
            <CounterItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counter;
