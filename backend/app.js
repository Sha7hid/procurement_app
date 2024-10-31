require("dotenv").config();
const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const supplierRoutes = require('./routes/supplierRoutes');
const itemRoutes = require('./routes/itemRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const connectDB = require("./config/db");

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api/suppliers', supplierRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

app.get('*', (req, res) => {
  res.send('Api for procurement');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
