import { Router } from 'express';
const itemRoutes = Router();
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from '../controllers/itemController.js';

// Create a new item
itemRoutes.post('/', createItem);

// Get all items
itemRoutes.get('/', getAllItems);

// Get an item by ID
itemRoutes.get('/:id', getItemById);

// Update an item by ID
itemRoutes.put('/:id', updateItem);

// Delete an item by ID
itemRoutes.delete('/:id', deleteItem);

export default itemRoutes;
