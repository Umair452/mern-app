import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.router.js';
import cors from 'cors';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors('*'));


// app.get('/test', (req, res) => {
//     res.json({message: 'Backend is working'});
// });

app.use('/api/products', productRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
};

startServer();
