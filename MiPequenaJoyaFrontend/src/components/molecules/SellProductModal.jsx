import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const SellProductModal = ({ show, onHide, onConfirm }) => {
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!show) {
            setQuantity('');
            setError('');
        }
    }, [show]);

    const handleConfirm = async () => {
        if (quantity > 0) {
            try {
                setError('');
                await onConfirm(quantity);
                setQuantity('');
                onHide();
            } catch (error) {
                setError(error.response?.data || 'Error al procesar la venta');
            }
        } else {
            setError('La cantidad debe ser mayor a 0.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Vender Producto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form>
                    <Form.Group className="mb-3" controlId="formQuantity">
                        <Form.Label>Cantidad a vender</Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Ej. 5"
                            min="1"
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="outline-info" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SellProductModal;