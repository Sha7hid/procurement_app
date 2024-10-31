const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ItemSchema = new Schema({
    itemNo: { type: String,  default: uuidv4 },
    itemName: { type: String, required: true },
    inventoryLocation: String,
    brand: String,
    category: String,
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    stockUnit: String,
    unitPrice: Number,
    itemImages: [String],
    status: { type: String, enum: ['Enabled', 'Disabled'], default: 'Enabled' }
});

const Item = model('Item', ItemSchema);

module.exports = Item;
