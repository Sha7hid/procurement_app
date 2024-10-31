const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PurchaseOrderSchema = new Schema({
    orderNo: { type: String, default: uuidv4 },
    orderDate: { type: Date, default: Date.now },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    itemTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    netAmount: { type: Number, default: 0 },
    items: [{
        item: { type: Schema.Types.ObjectId, ref: 'Item' },
        stockUnit: String,
        unitPrice: Number,
        packingUnit: String,
        orderQty: Number,
        itemAmount: Number,
        discount: Number,
        netAmount: Number
    }]
});

const PurchaseOrder = model('PurchaseOrder', PurchaseOrderSchema);

module.exports = PurchaseOrder;
