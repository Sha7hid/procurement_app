const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SupplierSchema = new Schema({
    supplierNo: { type: String, default: uuidv4 },
    supplierName: { type: String, required: true },
    address: String,
    taxNo: String,
    country: String,
    mobileNo: String,
    email: String,
    status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' }
});

const Supplier = model('Supplier', SupplierSchema);

module.exports = Supplier;
