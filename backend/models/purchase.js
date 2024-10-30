import { Schema, model } from 'mongoose';

const PurchaseOrderSchema = new Schema({
    orderNo: { type: Number, auto: true },
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

const Purchase = model('PurchaseOrder', PurchaseOrderSchema);

export default Purchase;
