import { Router } from 'express';
const supplierRoutes = Router();
import { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/supplierController.js';

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

export default supplierRoutes;
