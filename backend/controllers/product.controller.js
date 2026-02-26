import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
    // Logic to fetch all products from database
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Error fetching products'});
    }
}

export const createProduct = async (req, res) => {
    // Logic to create a new product

    const product = req.body; // Assuming the product data is sent in the request body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: 'All fields are required'});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
        
    } catch (error) {
        console.log("Error in creating product: ", error.message);
        res.status(500).json({success: false, message: 'Error creating product'});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: 'Invalid product id'});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {returnDocument: 'after'}); // ✅
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: 'Error updating product or wrong product id'});
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'Invalid product id'});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
        
    } catch (error) {
        res.status(500).json({success: false, message: 'Error deleting product or wrong product id'});
    }
    
}