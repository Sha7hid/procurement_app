const { Router } = require('express');
const itemRoutes = Router();
const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('../controllers/itemController');

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

module.exports = itemRoutes;
