import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import { config } from 'dotenv';
import supplierRoutes from './routes/supplierRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import purchaseOrderRoutes from './routes/purchaseOrderRoutes.js';

// Load environment variables
config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Database Connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));



// Use routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

// // Serve frontend static files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//   });
// }

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
