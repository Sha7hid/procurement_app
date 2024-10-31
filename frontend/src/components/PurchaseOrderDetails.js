import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './styles/PurchaseOrderDetails.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function PurchaseOrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const { data } = await api.get(`/purchase-orders/${orderId}?populate=supplier,items.item`);
                setOrder(data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handlePrint = () => {
        const printButton = document.getElementById('print-button');

        if (printButton) {
            printButton.style.display = 'none';
        }

        const printContent = document.getElementById('purchase-order-details').innerHTML;
        const newWindow = window.open('', '', 'height=500,width=800');
        newWindow.document.write('<html><head><title>Print Purchase Order</title>');
        newWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
        newWindow.document.write('</head><body>');
        newWindow.document.write(printContent);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.print();

        if (printButton) {
            printButton.style.display = 'block';
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!order) return <h2>Loading...</h2>;

    return (
        <>
            <Navbar />
            <button className='button' onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <div className="purchase-order-details" id="purchase-order-details">
                <h2>Purchase Order #{order.orderNo}</h2>
                <p><strong>Supplier:</strong> {order.supplier.supplierName}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Item Total:</strong> ${order.itemTotal.toFixed(2)}</p>
                <p><strong>Discount:</strong> ${order.discount.toFixed(2)}</p>
                <p><strong>Net Amount:</strong> ${order.netAmount.toFixed(2)}</p>

                <h3>Order Items</h3>
                <table className="order-items-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Item Total</th>
                            <th>Net Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((itemDetail, index) => (
                            <tr key={index}>
                                <td>{itemDetail.item?.itemName || 'Unknown Item'}</td>
                                <td>{itemDetail.orderQty}</td>
                                <td>${itemDetail.unitPrice.toFixed(2)}</td>
                                <td>${itemDetail.discount.toFixed(2)}</td>
                                <td>${itemDetail.itemAmount.toFixed(2)}</td>
                                <td>${itemDetail.netAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <div className='button-div'>
                    <button id="print-button" onClick={handlePrint}>Print Purchase Order</button>
                </div>
            </div>
        </>
    );
}

export default PurchaseOrderDetails;
