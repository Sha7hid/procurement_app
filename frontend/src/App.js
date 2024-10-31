import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Suppliers from '../src/pages/Suppliers';
import Items from './pages/Items';
import PurchaseOrders from './pages/PurchaseOrders';
import LandingPage from './pages/LandingPage';
import ItemDetails from './components/ItemDetails';
import PurchaseOrderDetails from './components/PurchaseOrderDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/purchase-orders/:orderId" element={<PurchaseOrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
