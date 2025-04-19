import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../molecules/ProductCard';

const ProductList = ({ products, onSell }) => {
    return (
        <Row className="g-3">
            {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard product={product} onSell={onSell} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;