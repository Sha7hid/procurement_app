import Item from "../models/item.js";

// Create a new item
export async function createItem(req, res) {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
}

// Get all items
export async function getAllItems(req, res) {
  try {
    const items = await Item.find().populate('supplier');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
}

// Get an item by ID
export async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id).populate('supplier');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
}

// Update an item
export async function updateItem(req, res) {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
}

// Delete an item
export async function deleteItem(req, res) {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
}
