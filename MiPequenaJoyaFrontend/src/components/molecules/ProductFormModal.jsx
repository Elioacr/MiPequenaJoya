import React, { useState } from 'react';
import axios from '../../services/api';
import { API_URL } from '../../services/api';
import { Button, Form, Modal } from 'react-bootstrap';

const categories = [
    { value: 'anillos', label: 'Anillos' },
    { value: 'collares', label: 'Collares' },
    { value: 'pulseras', label: 'Pulseras' },
    { value: 'pendientes', label: 'Pendientes' },
    { value: 'relojes', label: 'Relojes' },
];

const ProductFormModal = ({ show, onHide, onProductAdded }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        stock: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'price' || name === 'stock') {
            if (value < 0 || isNaN(value)) {
                return;
            }
        }

        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (product.price <= 0 || product.stock < 0) {
            alert('El precio debe ser mayor a 0 y el stock no puede ser negativo.');
            return;
        }

        try {
            await axios.post(`${API_URL}`, product);
            alert('Producto agregado exitosamente');
            onHide();
            onProductAdded();
        } catch (error) {
            console.error('Error al agregar producto:', error.response?.data || error.message);
            alert('Error al agregar el producto');
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Producto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formProductName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Ej. Anillo de compromiso"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formProductDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Ej. Un anillo elegante para ocasiones especiales"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formProductCategory">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formProductPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Ej. 1000"
                            min="0.01"
                            step="0.01"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formProductStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            placeholder="Ej. 10"
                            min="1"
                            required
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancelar
                        </Button>
                        <Button variant="outline-info" type="submit">
                            Agregar Producto
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductFormModal;