const Supplier = require('../models/supplier');

// Create a new supplier
async function createSupplier(req, res) {
    try {
        const supplier = new Supplier(req.body);
        const savedSupplier = await supplier.save();
        res.status(200).json(savedSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error creating supplier', error });
    }
}

// Get all suppliers
async function getAllSuppliers(req, res) {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching suppliers', error });
    }
}

// Get a supplier by ID
async function getSupplierById(req, res) {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching supplier', error });
    }
}

// Update a supplier
async function updateSupplier(req, res) {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier', error });
    }
}

// Delete a supplier
async function deleteSupplier(req, res) {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) return res.status(404).json({ message: 'Supplier not found' });
        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error });
    }
}

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
