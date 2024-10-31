import React, { useEffect, useState } from 'react';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/SupplierForm.css';

function UpdateSupplierForm({ supplier, onUpdate }) {
  const [formData, setFormData] = useState({
    supplierName: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
    status: 'Active',
  });

  // Populate the form with existing supplier data when the component mounts
  useEffect(() => {
    if (supplier) {
      setFormData({
        supplierName: supplier.supplierName,
        address: supplier.address,
        taxNo: supplier.taxNo,
        country: supplier.country,
        mobileNo: supplier.mobileNo,
        email: supplier.email,
        status: supplier.status,
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/suppliers/${supplier._id}`, formData); // Update supplier by ID
      toast.success('Supplier updated successfully!', {
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
        onUpdate();
      }, 2000);

    } catch (error) {
      console.error('Error updating supplier:', error);
      toast.error('Failed to update supplier. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Update Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input name="supplierName" placeholder="Supplier Name" value={formData.supplierName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="taxNo" placeholder="Tax No" value={formData.taxNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <select name="country" value={formData.country} onChange={handleChange} required>
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
          <input name="mobileNo" placeholder="Mobile No" value={formData.mobileNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <button type="submit">Update Supplier</button>
      </form>
    </div>
  );
}

export default UpdateSupplierForm;
