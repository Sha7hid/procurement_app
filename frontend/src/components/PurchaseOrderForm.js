import React, { useEffect, useState } from 'react';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/PurchaseOrderForm.css';

function PurchaseOrderForm({ onSave }) {
  const [formData, setFormData] = useState({
    supplier: '',
    items: [],
    orderDate: new Date().toISOString().split('T')[0],
    itemTotal: 0,
    discount: 0,
    netAmount: 0,
  });
  const [suppliers, setSuppliers] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    item: '',
    stockUnit: '',
    packingUnit: '',
    unitPrice: 0,
    orderQty: 1,
    discount: 0,
  });

  const stockUnits = ['kg', 'g', 'lb', 'oz', 'pcs', 'pack'];

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await api.get('/suppliers');
      setSuppliers(data);
    };

    const fetchItems = async () => {
      const { data } = await api.get('/items');
      setItemList(data);
    };

    fetchSuppliers();
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const addItemToOrder = () => {
    const item = itemList.find((item) => item._id === selectedItem.item);
    if (item) {
      const itemAmount = item.unitPrice * selectedItem.orderQty;
      const discountAmount = selectedItem.discount;
      const netAmount = itemAmount - discountAmount;

      const newItems = [
        ...formData.items,
        {
          item: selectedItem.item,
          stockUnit: selectedItem.stockUnit,
          packingUnit: selectedItem.packingUnit,
          unitPrice: item.unitPrice,
          orderQty: selectedItem.orderQty,
          itemAmount,
          discount: discountAmount,
          netAmount,
        },
      ];

      const updatedItemTotal = newItems.reduce((total, curr) => total + curr.itemAmount, 0);
      const updatedNetAmount = newItems.reduce((total, curr) => total + curr.netAmount, 0);

      const overallDiscount = parseFloat(formData.discount) || 0;
      const finalNetAmount = updatedNetAmount - overallDiscount;

      setFormData((prev) => ({
        ...prev,
        items: newItems,
        itemTotal: updatedItemTotal,
        netAmount: finalNetAmount,
      }));
    }

    setSelectedItem({ item: '', stockUnit: '', packingUnit: '', unitPrice: 0, orderQty: 1, discount: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/purchase-orders', formData);
      toast.success('Purchase order created successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: 'toast-custom',
      });
      setTimeout(() => {
        onSave();
      }, 2000);
    } catch (error) {
      console.error('Error creating purchase order:', error);
      toast.error('Failed to create purchase order. Please try again.');
    }
  };

  const overallDiscount = parseFloat(formData.discount) || 0;

  return (
    <form className="purchase-order-form" onSubmit={handleSubmit}>
      <ToastContainer />
      <h2>Create Purchase Order</h2>
      
      <div className="form-group">
        <select name="supplier" value={formData.supplier} onChange={handleChange}>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <input
          type="date"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleChange}
        />
      </div>
      
      <h3>Add Items to Order</h3>
      <div className="item-selection">
        <div className="form-group row">
          <div className="field-group">
            <select name="item" value={selectedItem.item} onChange={handleItemChange}>
              <option value="">Select Item</option>
              {itemList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.itemName}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <select name="stockUnit" value={selectedItem.stockUnit} onChange={handleItemChange}>
              <option value="">Select Stock Unit</option>
              {stockUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="field-group">
            <input
              type="text"
              name="packingUnit"
              placeholder="Packing Unit"
              value={selectedItem.packingUnit}
              onChange={handleItemChange}
            />
          </div>

          <div className="field-group">
            <input
              type="number"
              name="orderQty"
              placeholder="Quantity"
              value={selectedItem.orderQty}
              onChange={handleItemChange}
              min="1"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="field-group">
            <input
              type="number"
              name="discount"
              placeholder="Discount"
              value={selectedItem.discount}
              onChange={handleItemChange}
            />
          </div>

          <div className="field-group">
            <button type="button" onClick={addItemToOrder}>Add Item</button>
          </div>
        </div>
      </div>
      
      <h4>Order Summary</h4>
      <ul>
        {formData.items.map((item, index) => (
          <li key={index}>
            {item.item} - Qty: {item.orderQty} - Amount: ${item.itemAmount} - Net: ${item.netAmount}
          </li>
        ))}
      </ul>

      <div className="total-summary">
        <p>Item Total: ${formData.itemTotal}</p>
        <p>Overall Discount: ${overallDiscount}</p>
        <p>Net Amount: ${formData.netAmount}</p>
      </div>

      <button type="submit">Create Purchase Order</button>
    </form>
  );
}

export default PurchaseOrderForm;
