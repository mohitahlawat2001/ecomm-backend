import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "Name is required"],
        trim : true,
        maxLength: [50, "Name cannot be more than 50 characters"],
        }
    },
    {timestamps: true}
);

export default mongoose.model("Collection", collectionSchema);
