import React, { useEffect, useState } from 'react';
import api from '../api';
import PurchaseOrderForm from '../components/PurchaseOrderForm';
import Navbar from '../components/Navbar';
import './styles/PurchaseOrders.css';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Modal from '../components/Modal';

function PurchaseOrders() {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchPurchaseOrders = async () => {
        const { data } = await api.get('/purchase-orders?populate=supplier');
        setPurchaseOrders(data);
    };

    useEffect(() => {
        fetchPurchaseOrders();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleSave = async () => {
        await fetchPurchaseOrders();
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this purchase order?')) {
            try {
                await api.delete(`/purchase-orders/${id}`);
                fetchPurchaseOrders();
            } catch (error) {
                console.error("Error deleting purchase order:", error);
            }
        }
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheetData = [
            ["Order No", "Supplier", "Date", "Item Total", "Discount", "Net Amount"],
            ...purchaseOrders.map(order => [
                order.orderNo,
                order.supplier.supplierName,
                new Date(order.orderDate).toLocaleDateString(),
                order.itemTotal.toFixed(2),
                order.discount.toFixed(2),
                order.netAmount.toFixed(2),
            ]),
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Orders");

        XLSX.writeFile(workbook, 'Purchase_Orders.xlsx');
    };

    const handlePrint = () => {
        const printContent = `
            <html>
                <head>
                    <title>Print Purchase Orders</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h2>Purchase Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Supplier</th>
                                <th>Date</th>
                                <th>Item Total</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${purchaseOrders.map(order => `
                                <tr>
                                    <td>${order.orderNo}</td>
                                    <td>${order.supplier.supplierName}</td>
                                    <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>${order.itemTotal.toFixed(2)}</td>
                                    <td>${order.discount.toFixed(2)}</td>
                                    <td>${order.netAmount.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        const newWindow = window.open('', '', 'height=500,width=800');
        newWindow.document.write(printContent);
        newWindow.document.close();
        newWindow.print();
    };

    return (
        <>
            <Navbar />
            <div className="purchase-orders-page">
                <h2>Purchase Orders</h2>
                <div className="button-div">
                    <button onClick={toggleForm}>
                        {showForm ? 'Cancel' : 'Add New Purchase Order'}
                    </button>
                    <button onClick={exportToExcel}>Export to Excel</button>
                    <button onClick={handlePrint}>Print Purchase Orders</button>
                </div>
                <Modal isOpen={showForm} onClose={toggleForm}>
                    <PurchaseOrderForm onSave={handleSave} />
                </Modal>
                {purchaseOrders.length > 0 ? (
                    <table id="purchase-orders-table" className="purchase-orders-table">
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Supplier</th>
                                <th>Date</th>
                                <th>Item Total</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.orderNo}</td>
                                    <td>{order.supplier.supplierName}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>${order.itemTotal.toFixed(2)}</td>
                                    <td>${order.discount.toFixed(2)}</td>
                                    <td>${order.netAmount.toFixed(2)}</td>
                                    <td>
                                        <Link to={`/purchase-orders/${order._id}`}>
                                            <button>View Details</button>
                                        </Link>
                                        <button onClick={() => handleDelete(order._id)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>No Purchase Orders To Display</h1>
                )}
            </div>
        </>
    );
}

export default PurchaseOrders;
