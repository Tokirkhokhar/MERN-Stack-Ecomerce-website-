const express=require("express");
const catchAsyncErrors = require("./middleware/catchAsyncErrors");
const errorMiddleware = require("./middleware/error");
const app=express();

app.use(express.json());

// Routes
const product=require("./routes/productRoute");

app.use("/api/v1",product)

// Middleware for Errors
app.use(errorMiddleware)

module.exports=app;