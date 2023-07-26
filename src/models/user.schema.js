import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config  from "../config/index.js";
import crypto from "crypto";

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
    },
    // generate JWT token for user
    getJWTtoken: function () {
        return JWT.sign({ _id: this._id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY,
        });
    },
    // generate password reset token
    generateForgotPasswordToken: function () {
        const resetToken = crypto.randomBytes(20).toString("hex");

        // just to encrypt the token
        this.forgotPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // set token expiry to 10 minutes
        this.forgotPasswordExpiry = Date.now() + 10 * (60 * 1000);

        // return plain token
        return resetToken;
    },
}



export default mongoose.model("User", userSchema);