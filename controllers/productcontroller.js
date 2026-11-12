const fs = require("fs");
const { Product } = require("../models");

exports.addProduct = async (req, res) => {
    try {
        const { productName, price, stock } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const product = await Product.create({
            productName,
            price,
            stock,
            productImage: req.file.path
        });

        res.status(201).json({
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json({
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product retrieved successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, price, stock } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: "Product not found" });
        }

        const data = {};
        if (productName) data.productName = productName;
        if (price) data.price = price;
        if (stock) data.stock = stock;

        if (req.file) {
            if (fs.existsSync(product.productImage)) {
                fs.unlinkSync(product.productImage);
            }
            data.productImage = req.file.path;
        }

        await product.update(data);

        res.status(200).json({
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (fs.existsSync(product.productImage)) {
            fs.unlinkSync(product.productImage);
        }

        await product.destroy();

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};