// controllers/purchaseOrderController.js

import Purchase from "../models/purchase.js";

// Create a new purchase order
export async function createPurchaseOrder(req, res) {
  try {
    const purchaseOrder = new Purchase(req.body);

    // Calculate itemTotal, discount, and netAmount
    let itemTotal = 0;
    let totalDiscount = 0;

    purchaseOrder.items.forEach(item => {
      const itemAmount = item.orderQty * item.unitPrice;
      item.itemAmount = itemAmount;
      item.netAmount = itemAmount - item.discount;

      itemTotal += itemAmount;
      totalDiscount += item.discount;
    });

    purchaseOrder.itemTotal = itemTotal;
    purchaseOrder.discount = totalDiscount;
    purchaseOrder.netAmount = itemTotal - totalDiscount;

    const savedPurchaseOrder = await purchaseOrder.save();
    res.status(201).json(savedPurchaseOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating purchase order', error });
  }
}

// Get all purchase orders
export async function getAllPurchaseOrders(req, res) {
  try {
    const purchaseOrders = await Purchase.find().populate('supplier').populate('items.item');
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchase orders', error });
  }
}

// Get a purchase order by ID
export async function getPurchaseOrderById(req, res) {
  try {
    const purchaseOrder = await Purchase.findById(req.params.id).populate('supplier').populate('items.item');
    if (!purchaseOrder) return res.status(404).json({ message: 'Purchase order not found' });
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchase order', error });
  }
}

// Update a purchase order
export async function updatePurchaseOrder(req, res) {
  try {
    const updatedPurchaseOrder = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPurchaseOrder) return res.status(404).json({ message: 'Purchase order not found' });
    res.status(200).json(updatedPurchaseOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating purchase order', error });
  }
}

// Delete a purchase order
export async function deletePurchaseOrder(req, res) {
  try {
    const deletedPurchaseOrder = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchaseOrder) return res.status(404).json({ message: 'Purchase order not found' });
    res.status(200).json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting purchase order', error });
  }
}
