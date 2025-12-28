import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="col-md-6 col-lg-4 col-xl-3">
    <motion.div
      className="card-service"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="icon">
        <span className={`bx ${icon}`}></span>
      </div>
      <div className="caption">
        <h4 className="fg-theme">{title}</h4>
        <p>{description}</p>
      </div>
    </motion.div>
  </div>
);

const Services: React.FC = () => {
  const servicesData = [
    {
      icon: "bx-color-fill",
      title: "Diseño Web",
      description: "Enfocado en el Material Design",
    },
    {
      icon: "bx-devices",
      title: "Responsive",
      description:
        "Aplico Responsive para todos los dispositivos en paginas WEB",
    },
    {
      icon: "bx-vector",
      title: "UI/UX Diseño",
      description: "Interactividad entre todos los elementos de una pagina web",
    },
    {
      icon: "bx-desktop",
      title: "Desarrollo Web",
      description: "Amateur desarrollando paginas web",
    },
  ];

  return (
    <div className="vg-page page-service">
      <div className="container">
        <div className="text-center">
          <div className="badge-subhead">Servicios</div>
        </div>
        <h1 className="fw-normal text-center">Que puedo hacer?</h1>
        <div className="row mt-5">
          {servicesData.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
