const Product = require("../models/Product");


module.exports = class ProductController {
    // [GET] fetch all products
    static async fetchAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    // [GET] fetch product by id
    static async fetchProductById(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    // [POST] create a product
    static async createProduct(req, res) {
        const product = req.body;
        try {
            await Product.create(product);
            res.status(201).json({message: 'Product created successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    //[PUT] update a product
    static async updateProduct(req, res) {
        
    }
    //[PATCH] update a product
    static async restoreProduct(req, res) {
        try {
            const product = await Product.restore({ _id: req.params.id });
            res.status(201).json({message: 'Product restored successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    //[DETETE] trash a product
    static async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.delete({ _id: id });
            res.status(201).json({message: 'Product deleted successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
    //[DETETE] force trash a product
    static async forceDeleteProduct(req, res) {
        const id = req.params.id;
        try {
            const product = await Product.deleteOne({ _id: id });
            res.status(201).json({message: 'Product deleted successfuly!'})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}
