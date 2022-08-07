import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true }
}, {timestamps: true})

export default mongoose.model("Product", productSchema, "products");