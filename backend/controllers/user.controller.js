import jsonwebtoken from "jsonwebtoken";
import Axios from "axios";
import { User } from "../models/user.model.js";

export const home = (req, res) => {
    Axios({ method: "GET",
            url: "https://fruityvice.com/api/fruit/all"})
    .catch((error) => {
        res.status(500).send({ message: error });
    })
    .then((fruits) => {
        res.status(200).send(fruits.data);
    });
};

export const profile = (req, res) => {
    const user = jsonwebtoken.decode(req.body.token).user;

    User.findOne({ user: user })
    .catch((error) => {
        res.status(500).send({ message: error });
    })
    .then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(user.fruits);
    });
};
