import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import ItemForm from '../components/ItemForm';
import UpdateItemForm from '../components/UpdateItemForm'; // Import the UpdateItemForm
import Navbar from '../components/Navbar';
import './styles/Items.css';
import Modal from '../components/Modal';

function Items() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false); // State for the update form
    const [selectedItem, setSelectedItem] = useState(null); // State for selected item to update

    const fetchItems = async () => {
        const { data } = await api.get('/items');
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const toggleUpdateForm = (item) => {
        setSelectedItem(item);
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSave = async () => {
        await fetchItems();
        setShowForm(false);
    };

    const handleUpdate = async () => {
        await fetchItems();
        setShowUpdateForm(false);
        setSelectedItem(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/items/${id}`);
                fetchItems();
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="items-page">
                <h2>Items</h2>
                <div className="button-div">
                    <button onClick={toggleForm}>{showForm ? 'Cancel' : 'Add New Item'}</button>
                </div>
                <Modal isOpen={showForm} onClose={toggleForm}>
                    <ItemForm onSave={handleSave} />
                </Modal>
                <Modal isOpen={showUpdateForm} onClose={toggleUpdateForm}>
                    {selectedItem && (
                        <UpdateItemForm item={selectedItem} onUpdate={handleUpdate} />
                    )}
                </Modal>
                {items.length > 0 ? (
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Item No</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Supplier</th>
                                <th>Unit Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.itemNo}</td>
                                    <td>
                                        <Link to={`/items/${item._id}`}>{item.itemName}</Link>
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    <td>{item.supplier.supplierName}</td>
                                    <td>${item.unitPrice.toFixed(2)}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button onClick={() => toggleUpdateForm(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item._id)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>No Items To Display</h1>
                )}
            </div>
        </>
    );
}

export default Items;
