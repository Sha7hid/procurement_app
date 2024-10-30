import { Schema, model } from 'mongoose';

const ItemSchema = new Schema({
    itemNo: { type: Number, auto: true },
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

export default Item;