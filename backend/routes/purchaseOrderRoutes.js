import { Router } from 'express';
const purchaseOrderRoutes = Router();
import { createPurchaseOrder, getAllPurchaseOrders, getPurchaseOrderById, updatePurchaseOrder, deletePurchaseOrder } from '../controllers/purchaseOrderController.js';

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

export default purchaseOrderRoutes;
