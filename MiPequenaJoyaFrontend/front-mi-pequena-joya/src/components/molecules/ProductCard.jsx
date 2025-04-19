import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ product, onSell }) => {
    return (
        <Card className="mb-3 h-100 bg-dark text-white">
            <Card.Body className="d-flex flex-column">
                <div>
                    <Card.Title className="text-truncate">{product.name}</Card.Title>
                    <Card.Text className="text-truncate">{product.description}</Card.Text>
                    <Card.Text>Categoría: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Card.Text>
                    <Card.Text>Precio: ${product.price.toLocaleString('es-ES')}</Card.Text>
                    <Card.Text className={product.stock <= 0 ? 'text-danger mt-5' : ''}>
                        Stock: {product.stock > 0 ? product.stock : 'Agotado'}
                    </Card.Text>
                </div>
                {product.stock > 0 && (
                    <Button
                        variant="outline-success"
                        onClick={() => onSell(product.id)}
                        className="mt-auto"
                    >
                        Vender
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;