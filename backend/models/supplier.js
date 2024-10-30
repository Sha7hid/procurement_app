import { Schema, model } from 'mongoose';

const SupplierSchema = new Schema({
    supplierNo: { type: Number, auto: true },
    supplierName: { type: String, required: true },
    address: String,
    taxNo: String,
    country: String,
    mobileNo: String,
    email: String,
    status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' }
});

const Supplier = model('Supplier', SupplierSchema);

export default Supplier;