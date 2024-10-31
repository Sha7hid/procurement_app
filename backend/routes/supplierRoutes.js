const { Router } = require('express');
const supplierRoutes = Router();
const { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } = require('../controllers/supplierController'); // Changed to CommonJS require

// Create a new supplier
supplierRoutes.post('/', createSupplier);

// Get all suppliers
supplierRoutes.get('/', getAllSuppliers);

// Get a supplier by ID
supplierRoutes.get('/:id', getSupplierById);

// Update a supplier by ID
supplierRoutes.put('/:id', updateSupplier);

// Delete a supplier by ID
supplierRoutes.delete('/:id', deleteSupplier);

module.exports = supplierRoutes; // Changed to CommonJS export
