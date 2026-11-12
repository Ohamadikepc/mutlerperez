const router = require("express").Router();
const { addProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require("../controllers/productcontroller");
const upload = require("../Middleware/multer");
const { validateProduct, validateUpdate } = require("../Middleware/productvalidation");

router.post("/product", upload.single("productImage"), validateProduct, addProduct);

router.get("/product", getAllProducts);

router.get("/product/:id", getOneProduct);

router.patch("/product/:id", upload.single("productImage"), validateUpdate, updateProduct);

router.delete("/product/:id", deleteProduct);

module.exports = router;