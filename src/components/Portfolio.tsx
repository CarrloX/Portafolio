import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import cart from "../assets/img/work/cart.jpg";
import hogwarts from "../assets/img/work/hogwarts.jpg";
import deportStars from "../assets/img/work/deport stars.jpg";

interface Project {
  id: string;
  img: string;
  title: string;
  description: string;
}

interface PortfolioItemProps {
  project: Project;
  onClick: () => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ project, onClick }) => (
  <div
    className="col-md-6 col-lg-4 grid-item"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <motion.div
      className="img-place"
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        layoutId={`img-${project.id}`}
        src={project.img}
        alt={project.title}
      />
      <div className="img-caption">
        <h5 className="fg-theme">{project.title}</h5>
        <p>{project.description}</p>
      </div>
    </motion.div>
  </div>
);

const Portfolio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      img: cart,
      title: "Shopping RIWI",
      description: "Productos y sitema de compras!",
    },
    {
      id: "2",
      img: hogwarts,
      title: "Hogwarts Legacy Proyect",
      description: "Rol y asignaciones a entidades",
    },
    {
      id: "3",
      img: deportStars,
      title: "Deport Stars",
      description: "Una tienda para vender y comprar de la NBA y MLB",
    },
  ];

  const selectedProject = projects.find((p) => p.id === selectedId);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedId]);

  return (
    <div className="vg-page page-portfolio" id="portfolio">
      <div className="container">
        <div className="text-center">
          <div className="badge-subhead">Portafolio</div>
        </div>
        <h1 className="text-center fw-normal">Mira mis proyectos</h1>
        <div className="row mt-5">
          {projects.map((project) => (
            <PortfolioItem
              key={project.id}
              project={project}
              onClick={() => setSelectedId(project.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            className="portfolio-modal-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="expanded-card"
              style={{
                width: "100%",
                maxWidth: "1000px",
                backgroundColor: "#1c1f23",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`img-${selectedId}`}
                src={selectedProject.img}
                alt={selectedProject.title}
                style={{ width: "100%", height: "auto" }}
              />
              <div style={{ padding: "30px", textAlign: "center" }}>
                <h2 className="fg-theme">{selectedProject.title}</h2>
                <p style={{ fontSize: "1.1rem", color: "#adb5bd" }}>
                  {selectedProject.description}
                </p>
                <button
                  className="btn btn-theme btn-rounded"
                  onClick={() => setSelectedId(null)}
                >
                  Cerrar
                </button>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  color: "#fff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  fontSize: "24px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="bx bx-x"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
