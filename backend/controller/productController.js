const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");

// Create Products --Admin
exports.createProduct=catchAsyncErrors( async(req,res,next)=>{
   const product = await Product.create(req.body)
   res.status(201).json({
    success:true,
    product,
   })
});

// Get all products 
exports.getAllProducts=catchAsyncErrors(async(req , res)=>{
    const resultPerPage=2;
    const productCount = await Product.countDocuments();
    const apifeature=new Apifeatures(Product.find(),req.query)
    .search()
    .fillter()
    .pagination(resultPerPage)
    let  products=await apifeature.query
    console.log(productCount);
    res.status(200).json({
        success:true,
        productCount,
        products,
    })
})
// Update Product -- Admin
exports.updateProduct=async(req,res,next)=>{
    let  product=await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product is not found!"})
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    res.status(200).json({
        success:true,
        message:"Product is updated ",
        product
    })
}

// Get Product Details 
exports.getProductsDetails=  catchAsyncErrors( async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product,
        
    });
});

// Delete Product -- Admin
exports.deleteProduct=async(req,res)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"product is deleted successfully !!"})
}

