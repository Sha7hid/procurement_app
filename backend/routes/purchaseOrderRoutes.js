const { Router } = require('express');
const purchaseOrderRoutes = Router();
const { createPurchaseOrder, getAllPurchaseOrders, getPurchaseOrderById, updatePurchaseOrder, deletePurchaseOrder } = require('../controllers/purchaseOrderController'); // Changed to CommonJS require

// Create a new purchase order
purchaseOrderRoutes.post('/', createPurchaseOrder);

// Get all purchase orders
purchaseOrderRoutes.get('/', getAllPurchaseOrders);

// Get a purchase order by ID
purchaseOrderRoutes.get('/:id', getPurchaseOrderById);

// Update a purchase order by ID
purchaseOrderRoutes.put('/:id', updatePurchaseOrder);

// Delete a purchase order by ID
purchaseOrderRoutes.delete('/:id', deletePurchaseOrder);

module.exports = purchaseOrderRoutes; // Changed to CommonJS export
