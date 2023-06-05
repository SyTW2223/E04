import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fruits: [{
        type: Number
    }]
});

export const User = mongoose.model("User", UserSchema);
