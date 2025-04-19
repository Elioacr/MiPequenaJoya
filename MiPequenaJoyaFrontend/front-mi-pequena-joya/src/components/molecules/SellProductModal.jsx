import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const SellProductModal = ({ show, onHide, onConfirm }) => {
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(''); // Estado para manejar errores

    const handleConfirm = async () => {
        if (quantity > 0) {
            try {
                setError(''); // Limpiar errores previos
                await onConfirm(quantity); // Llamar a la función de confirmación del padre
                setQuantity(''); // Limpiar el campo después de confirmar
                onHide(); // Cerrar el modal
            } catch (error) {
                // Mostrar el mensaje de error devuelto por el backend
                setError(error.response?.data || 'Error al procesar la venta');
            }
        } else {
            setError('La cantidad debe ser mayor a 0.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            {/* Encabezado del modal */}
            <Modal.Header closeButton>
                <Modal.Title>Vender Producto</Modal.Title>
            </Modal.Header>

            {/* Cuerpo del modal */}
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>} {/* Mensaje de error */}

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

            {/* Pie del modal */}
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