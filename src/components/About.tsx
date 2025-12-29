import React, { useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import yop from "../assets/img/yop.jpg";

// Type definition for iOS DeviceOrientationEvent which includes requestPermission
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

interface SkillBarProps {
  label: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ label, percentage }) => (
  <div className="progress-wrapper mb-4">
    <div className="d-flex justify-content-between mb-1">
      <label htmlFor={`skill-${label}`} className="caption mb-0">
        {label}
      </label>
      <span className="small text-muted">{percentage}%</span>
    </div>
    <div className="progress">
      <motion.div
        id={`skill-${label}`}
        className="progress-bar"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

const About: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring physics for smoothing
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [20, -20]);
  const rotateY = useTransform(springX, [-100, 100], [-20, 20]);

  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;

      // Gamma (left/right tilt) maps to X axis
      // Beta (front/back tilt) maps to Y axis
      // We assume a comfortable holding angle of ~45 degrees for Beta
      const sensitivity = 2.5;
      const xVal = event.gamma * sensitivity;
      const yVal = (event.beta - 45) * sensitivity;

      x.set(Math.min(Math.max(xVal, -100), 100));
      y.set(Math.min(Math.max(yVal, -100), 100));
    },
    [x, y]
  );

  useEffect(() => {
    // For non-iOS or older iOS that doesn't require permission
    const DeviceEvent =
      DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceEvent.requestPermission !== "function"
    ) {
      globalThis.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      globalThis.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [handleOrientation]);

  const handleInteraction = async () => {
    // Request permission for iOS 13+ devices
    const DeviceEvent =
      DeviceOrientationEvent as unknown as DeviceOrientationEventiOS;
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceEvent.requestPermission === "function"
    ) {
      try {
        const permissionState = await DeviceEvent.requestPermission();
        if (permissionState === "granted") {
          globalThis.addEventListener("deviceorientation", handleOrientation);
        }
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
      }
    }
  };

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="vg-page page-about" id="about">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-4 py-3" style={{ perspective: "1000px" }}>
            <motion.div
              className="img-place img-about"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleInteraction}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                cursor: "pointer",
              }}
            >
              <motion.img
                src={yop}
                alt="Carlos Ramirez"
                style={{
                  transform: "translateZ(50px)",
                  borderRadius: "12px",
                }}
              />
              {/* Shine effect */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)",
                  transform: "translateZ(60px)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="fw-light">Carlos Ramirez</h1>
              <h5 className="fg-theme mb-3">Programador en Desarrollo</h5>
              <p className="description-text">
                Soy un estudiante de programación que quiere dedicarse al
                Frontend y al Back-end. Me apasiona crear soluciones web
                elegantes y funcionales.
              </p>
              <ul className="list-unstyled theme-list">
                <li>
                  <b>Soy de:</b> Medellin, COL
                </li>
                <li>
                  <b>Vivo en:</b> Medellin, COL
                </li>
                <li>
                  <b>Edad:</b> {calculateAge("1999-10-08")}
                </li>
              </ul>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-theme-outline btn-rounded mt-3"
              >
                Visita mi Github
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h1 className="text-center fw-normal mb-5">Mis Habilidades</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="px-lg-3">
              <h4 className="mb-4">Habilidades de Código</h4>
              <SkillBar label="Python" percentage={80} />
              <SkillBar label="HTML" percentage={95} />
              <SkillBar label="CSS" percentage={90} />
              <SkillBar label="JavaScript" percentage={85} />
              <SkillBar label="Java" percentage={75} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="px-lg-3">
              <h4 className="mb-4">Habilidades de Diseño</h4>
              <SkillBar label="Diseño UI / UX" percentage={70} />
              <SkillBar label="Diseño Web" percentage={85} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
