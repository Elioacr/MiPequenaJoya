import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import Logo from '../atoms/Logo';
import MPJLogo from '../../images/mpj.png';

const Header = ({ onAddProduct }) => {
    return (
        <Navbar bg="black" expand="lg" fixed="top" className="shadow-sm">
            <Container fluid className="d-flex justify-content-around">
                <Navbar.Brand as="div" className="d-flex align-items-center">
                    <Logo src={MPJLogo} alt="Mi Pequeña Joya" />
                    <span className="ms-2 text-white">Mi Pequeña Joya</span>
                </Navbar.Brand>

                <Button variant="outline-light" onClick={onAddProduct}>
                    Agregar Producto
                </Button>
            </Container>
        </Navbar>
    );
};

export default Header;