import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductList from '../components/organisms/ProductList';
import ProductFormModal from '../components/molecules/ProductFormModal';
import SellProductModal from '../components/molecules/SellProductModal';
import { API_URL } from '../services/api';
import DashboardTemplate from '../components/templates/DashboardTemplate';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sellModalShow, setSellModalShow] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSellProduct = (id) => {
        setSelectedProductId(id);
        setSellModalShow(true);
    };

    const handleConfirmSell = async (quantity) => {
        try {
            await axios.post(`${API_URL}/${selectedProductId}`, null, { params: { quantity } });
            fetchProducts();
        } catch (error) {
            throw error;
        }
    };

    const handleProductAdded = () => {
        window.location.reload();
    };

    return (
        <DashboardTemplate onAddProduct={() => setShowModal(true)}>
            <ProductList products={products} onSell={handleSellProduct} />

            <ProductFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onProductAdded={handleProductAdded}
            />

            <SellProductModal
                show={sellModalShow}
                onHide={() => setSellModalShow(false)}
                onConfirm={handleConfirmSell}
            />
        </DashboardTemplate>
    );
};

export default DashboardPage;