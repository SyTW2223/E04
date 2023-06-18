import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const signUp = async (req, res) => {
    try {
        const user = new User({
            user: req.body.user,
            password: bcrypt.hashSync(req.body.password, 8),
            fruits: req.body.fruits
        });

        await user.save();
        res.status(200).json({ message: "User was registered successfully", user: user.user });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while registering user" });
  }
};

export const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ user: req.body.user });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid password" });
        }
        const token = jsonwebtoken.sign(
            { user: user.user },
            "secret",
            { expiresIn: "86400s" }
        );
        res.send({ token: token });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};
