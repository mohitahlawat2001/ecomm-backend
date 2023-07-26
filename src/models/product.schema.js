import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name is required"],
        trim: true,
        maxLength: [50, "Name cannot be more than 50 characters"],
    },
    price: {
        type: Number,
        required: [true, "product price is required"],
        maxLength: [5, "price cannot be more than 5 characters"],
    },
    description: {
        type: String,
    },
    photos: [
        {
            secure_url: {
                type: String,
                required: true
            },
        }
    ],
    stock: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    collectionId: {
        ref: "Collection",
        required: true,
    }
},{timestamps: true});

export default mongoose.model("Product", productSchema);