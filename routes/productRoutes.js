const {getAllProduct,createProduct}=require("../controllers/productController");
const {uploadProductImage}=require("../controllers/uploadsController");
const express=require('express');
const router=express.Router();

router.route("/").get(getAllProduct).post(createProduct);
router.route("/uploads").post(uploadProductImage)

module.exports=router