import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const signUp = (req, res) => {
    const user = new User({
        user: req.body.user,
        password: bcrypt.hashSync(req.body.password, 8),
        fruits: req.body.fruits
    });

    user.save()
    .catch((error) => {
        res.status(500).send({ message: error });
    })
    .then(() => {
        res.status(200).send({ message: "User was registered successfully" });
    });
};

export const signIn = (req, res) => {
    User.findOne({ user: req.body.user })
    .catch((error) => {
        res.status(500).send({ message: error });
    })
    .then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }

        const validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            res.status(401).send({ message: "Invalid password" });
        }
        
        const token = jsonwebtoken.sign(
            { user: user.user},
            process.env.TOKEN_SECRET,
            { expiresIn: "86400s" }
        );

        res.send({ token: token });
    });
};