import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import DashboardPage from '../pages/DashboardPage';

const GeneralRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
            </Routes>
        </Router>
    );
};

export default GeneralRoutes;