const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = express.Router();
const verifyToken = require("./verifyToken");


const productSchema = new mongoose.Schema({
    "name": String,
    "manufacturingCompany": String,
    "manufacturingDate": String,
    "expiryDate": String
});

const productModel = new mongoose.model("product", productSchema);

router.post("/createProduct", verifyToken, (req, res)=>{
    let product = req.body;
    let productObj = new productModel(product);
    productObj.save().then(()=>{
        res.send({"message": "Product Created"});
    })
})

router.get("/viewProduct",  verifyToken, async (req, res)=>{
    let product = await productModel.find();
    res.send({product});
})
router.get("/viewProduct/:id",  verifyToken, async (req, res)=>{
    let id = req.params.id;
    let product = await productModel.findOne({"_id":id});
    res.send({product});
})
module.exports = router;