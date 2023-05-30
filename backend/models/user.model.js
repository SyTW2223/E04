import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

export const User = mongoose.model("User", UserSchema);
