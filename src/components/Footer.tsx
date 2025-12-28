import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="vg-footer" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 py-3">
            <div className="footer-info">
              <h1 className="text-white mb-4">Carlos Ramirez</h1>
              <p>Aquí puedes encontrarme</p>
              <div className="divider"></div>
              <p className="fs-large fg-white">Medellín COL, 051040</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 py-3">
            <div className="float-lg-right">
              <p>Contáctame</p>
              <div className="divider"></div>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="mailto:carlito1999@live.com"
                    className="text-decoration-none text-white fs-small"
                  >
                    carlito1999@live.com
                  </a>
                </li>
                <li className="text-white fs-small">+57-3023651173</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Carlos Ramirez. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
