import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Logo from '../atoms/Logo';
import MPJLogo from '../../images/mpj.png';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-4 mt-5 w-100">
            <div className="px-4">
                <Row className="gy-4 justify-content-around align-items-center">
                    <Col xs={12} md="auto" className="d-flex align-items-center">
                        <Logo src={MPJLogo} alt="Mi Pequeña Joya" />
                        <span className="ms-2 text-uppercase text-white">Mi Pequeña Joya</span>
                    </Col>

                    <Col xs={12} md="auto" className="text-md-start">
                        <h5 className="text-uppercase fw-bold mb-3">Contacto</h5>
                        <p>
                            <i className="bi bi-envelope me-2"></i>
                            contacto@mipequenajoya.com
                        </p>
                        <p>
                            <i className="bi bi-telephone me-2"></i>
                            +56 9 1234 7890
                        </p>
                    </Col>
                </Row>

                <hr className="border-white opacity-25 my-4" />
                <p className="text-center mb-0">
                    © 2025 Mi Pequeña Joya. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;