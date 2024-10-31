import React, { useEffect, useState } from 'react';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/ItemForm.css';

function UpdateItemForm({ item, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplierId: '',
        stockUnit: '',
        unitPrice: 0,
        itemImages: [],
        status: 'Enabled',
    });
    const [suppliers, setSuppliers] = useState([]);
    const [imageInput, setImageInput] = useState('');

    useEffect(() => {
        const fetchSuppliers = async () => {
            const { data } = await api.get('/suppliers');
            setSuppliers(data);
        };
        fetchSuppliers();
        // Set form data with the existing item data
        if (item) {
            setFormData({
                name: item.itemName,
                inventoryLocation: item.inventoryLocation,
                brand: item.brand,
                category: item.category,
                supplierId: item.supplier._id,
                stockUnit: item.stockUnit,
                unitPrice: item.unitPrice,
                itemImages: item.itemImages,
                status: item.status,
            });
        }
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageInput(e.target.value);
    };

    const addImage = () => {
        if (imageInput && imageInput.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g)) {
            setFormData((prev) => ({
                ...prev,
                itemImages: [...prev.itemImages, imageInput],
            }));
            setImageInput('');
        } else {
            alert('Please enter a valid image URL ending with jpg, jpeg, gif, or png');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/items/${item._id}`, {
                itemName: formData.name,
                inventoryLocation: formData.inventoryLocation,
                brand: formData.brand,
                category: formData.category,
                supplier: formData.supplierId,
                stockUnit: formData.stockUnit,
                unitPrice: formData.unitPrice,
                itemImages: formData.itemImages,
                status: formData.status,
            });
            toast.success('Item updated successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                onUpdate();
            }, 2000);
        } catch (error) {
            console.error('Error updating item:', error);
            toast.error('Failed to update item. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <ToastContainer />
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields are the same as ItemForm */}
                <div className="form-group">
                    <input
                        name="name"
                        placeholder="Item Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input
                            name="inventoryLocation"
                            placeholder="Inventory Location"
                            value={formData.inventoryLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="brand"
                            placeholder="Brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <select name="supplierId" value={formData.supplierId} onChange={handleChange}>
                            <option value="">Select Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier._id} value={supplier._id}>
                                    {supplier.supplierName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <select name="stockUnit" value={formData.stockUnit} onChange={handleChange}>
                            <option value="">Select Stock Unit</option>
                            <option value="pieces">Pieces</option>
                            <option value="boxes">Boxes</option>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="liters">Liters</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="unitPrice"
                            placeholder="Unit Price"
                            value={formData.unitPrice}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                    </select>
                </div>

                <div className="form-group">
                    <input
                        placeholder="Image URL"
                        value={imageInput}
                        onChange={handleImageChange}
                    />
                    <button type="button" onClick={addImage}>Add Image</button>
                </div>
                <div className="form-group">
                    <h4>Images:</h4>
                    <ul>
                        {formData.itemImages.map((image, index) => (
                            <li key={index}>
                                <img src={image} alt={`Item ${index}`} className="image-preview" />
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Update Item</button>
            </form>
        </div>
    );
}

export default UpdateItemForm;
