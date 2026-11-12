const fs = require("fs");

const removeFile = (req) => {
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
};

exports.validateProduct = (req, res, next) => {
    const { productName, price, stock } = req.body;
    const errors = [];

    if (!productName || productName.trim() === "") {
        errors.push("productName is required");
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
        errors.push("price must be a number greater than 0");
    }
    if (stock === undefined || stock === "" || isNaN(stock) || Number(stock) < 0) {
        errors.push("stock must be a number, 0 or more");
    }
    if (!req.file) {
        errors.push("productImage is required");
    }

    if (errors.length > 0) {
        removeFile(req);
        return res.status(400).json({ message: "Validation failed", errors });
    }
    next();
};

exports.validateUpdate = (req, res, next) => {
    const { productName, price, stock } = req.body;
    const errors = [];

    if (productName !== undefined && productName.trim() === "") {
        errors.push("productName cannot be empty");
    }
    if (price !== undefined && (isNaN(price) || Number(price) <= 0)) {
        errors.push("price must be a number greater than 0");
    }
    if (stock !== undefined && (stock === "" || isNaN(stock) || Number(stock) < 0)) {
        errors.push("stock must be a number, 0 or more");
    }

    if (errors.length > 0) {
        removeFile(req);
        return res.status(400).json({ message: "Validation failed", errors });
    }
    next();
};