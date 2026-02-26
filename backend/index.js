import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.router.js';
dotenv.config();


const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({message: 'Backend is working'});
});

app.use('/api/products', productRoutes);



app.listen(process.env.PORT || 5000, () => {
    connectDB(); 
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    
})
