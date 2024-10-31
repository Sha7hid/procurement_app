import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './styles/ItemDetails.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch item details by ID
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await api.get(`/items/${id}`);
                setItem(data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) return <p>Loading...</p>;

    return item ? (
        <>
            <Navbar />
            <button className='button' onClick={handleBack} style={{ marginBottom: '20px' }}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <div className="item-details">
                <h2>Item Details: {item.itemName}</h2>
                <p><strong>Item No:</strong> {item.itemNo}</p>
                <p><strong>Brand:</strong> {item.brand}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Supplier:</strong> {item.supplier.supplierName}</p>
                <p><strong>Inventory Location:</strong> {item.inventoryLocation}</p>
                <p><strong>Stock Unit:</strong> {item.stockUnit}</p>
                <p><strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <h3>Images</h3>
                <div className="item-images">
                    {item.itemImages && item.itemImages.length > 0 ? (
                        item.itemImages.map((url, index) => (
                            <img key={index} src={url} alt={`Item ${index}`} />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
            </div>
        </>
    ) : (
        <p>Item not found</p>
    );
}

export default ItemDetails;
