import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

const DashboardTemplate = ({ children, onAddProduct }) => {
    return (
        <div>
            <Header onAddProduct={onAddProduct} />
            <main className="container" style={{ paddingTop: '8rem' }}>
            <h2 className="text-center text-uppercase fw-bold mb-4">Productos</h2>
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default DashboardTemplate;