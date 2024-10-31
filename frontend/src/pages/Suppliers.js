import React, { useEffect, useState } from 'react';
import api from '../api';
import SupplierForm from '../components/SupplierForm';
import UpdateSupplierForm from '../components/UpdateSupplierForm'; // Import the UpdateSupplierForm
import Modal from '../components/Modal'; // Import the Modal component
import Navbar from '../components/Navbar';
import './styles/Suppliers.css';

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false); // State for the update form modal
    const [selectedSupplier, setSelectedSupplier] = useState(null); // State to hold selected supplier for update

    const fetchSuppliers = async () => {
        const { data } = await api.get('/suppliers');
        setSuppliers(data);
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
        setSelectedSupplier(null); // Reset selected supplier when adding new supplier
    };

    const toggleUpdateForm = (supplier) => {
        setSelectedSupplier(supplier);
        setShowUpdateForm(!showUpdateForm);
    };

    const handleSave = async () => {
        await fetchSuppliers();
        setShowForm(false);
    };

    const handleUpdate = async () => {
        await fetchSuppliers();
        setShowUpdateForm(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                await api.delete(`/suppliers/${id}`);
                fetchSuppliers();
            } catch (error) {
                console.error("Error deleting supplier:", error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="suppliers-page">
                <h2>Suppliers</h2>
                <button className="add-supplier-btn" onClick={toggleForm}>
                    {showForm ? 'Cancel' : 'Add New Supplier'}
                </button>

                <Modal isOpen={showForm} onClose={toggleForm}>
                    <SupplierForm onSave={handleSave} />
                </Modal>

                {/* Modal for updating supplier */}
                <Modal isOpen={showUpdateForm} onClose={toggleUpdateForm}>
                    {selectedSupplier && (
                        <UpdateSupplierForm supplier={selectedSupplier} onUpdate={handleUpdate} />
                    )}
                </Modal>

                <br />
                {suppliers.length > 0 ? (
                    <table className="suppliers-table">
                        <thead>
                            <tr>
                                <th>Supplier No</th>
                                <th>Supplier Name</th>
                                <th>Address</th>
                                <th>Tax No</th>
                                <th>Country</th>
                                <th>Mobile No</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier) => (
                                <tr key={supplier._id}>
                                    <td>{supplier.supplierNo}</td>
                                    <td>{supplier.supplierName}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.taxNo}</td>
                                    <td>{supplier.country}</td>
                                    <td>{supplier.mobileNo}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.status}</td>
                                    <td>
                                        <button onClick={() => toggleUpdateForm(supplier)} className="edit-btn">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(supplier._id)} className="delete-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1>No Data To Display</h1>
                )}
            </div>
        </>
    );
}

export default Suppliers;
