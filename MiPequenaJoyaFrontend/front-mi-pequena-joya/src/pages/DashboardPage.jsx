import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import ProductList from '../components/organisms/ProductList';
import ProductFormModal from '../components/molecules/ProductFormModal';
import SellProductModal from '../components/molecules/SellProductModal'; // Importar el nuevo modal
import { API_URL } from '../services/api';
import DashboardTemplate from '../components/templates/DashboardTemplate';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sellModalShow, setSellModalShow] = useState(false); // Estado para controlar el modal de venta
    const [selectedProductId, setSelectedProductId] = useState(null); // ID del producto seleccionado

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
        setSelectedProductId(id); // Guardar el ID del producto seleccionado
        setSellModalShow(true); // Mostrar el modal de venta
    };

    const handleConfirmSell = async (quantity) => {
        try {
            await axios.post(`${API_URL}/${selectedProductId}`, null, { params: { quantity } });
            fetchProducts(); // Actualizar la lista de productos
        } catch (error) {
            // Lanzar el error para que el modal lo maneje
            throw error;
        }
    };

    const handleProductAdded = () => {
        window.location.reload();
    };

    return (
        <DashboardTemplate onAddProduct={() => setShowModal(true)}>
            <ProductList products={products} onSell={handleSellProduct} />

            {/* Modal de agregar producto */}
            <ProductFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onProductAdded={handleProductAdded}
            />

            {/* Modal de venta */}
            <SellProductModal
                show={sellModalShow}
                onHide={() => setSellModalShow(false)}
                onConfirm={handleConfirmSell}
            />
        </DashboardTemplate>
    );
};

export default DashboardPage;