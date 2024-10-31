import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/suppliers">Suppliers</Link>
      <Link to="/items">Items</Link>
      <Link to="/purchase-orders">Purchase Orders</Link>
    </nav>
  );
}

export default Navbar;
