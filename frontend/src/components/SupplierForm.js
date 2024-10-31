import React, { useState } from 'react';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/SupplierForm.css';

function SupplierForm({ onSave }) {
  const [formData, setFormData] = useState({
    supplierName: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/suppliers', formData);
      toast.success('Supplier added successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: 'toast-custom',
      });


      setTimeout(() => {
        onSave();
      }, 2000);

    } catch (error) {
      console.error('Error saving supplier:', error);
      toast.error('Failed to add supplier. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input name="supplierName" placeholder="Supplier Name" value={formData.supplierName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="taxNo" placeholder="Tax No" value={formData.taxNo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div className="form-group">
          <input name="mobileNo" placeholder="Mobile No" value={formData.mobileNo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <button type="submit">Save Supplier</button>
      </form>
    </div>
  );
}

export default SupplierForm;
