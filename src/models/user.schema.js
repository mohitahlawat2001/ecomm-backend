import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password cannot be less than 8 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date

}, {timestamps: true});

// encrypt password before saving: HOOKS
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

    
userSchema.methods ={
    // check if password is correct
    comparePassword: async function ( enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }
}



export default mongoose.model("User", userSchema);