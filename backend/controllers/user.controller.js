import jsonwebtoken from "jsonwebtoken";
import Axios from "axios";
import { User } from "../models/user.model.js";

export const home = (req, res) => {
    Axios.get("https://fruityvice.com/api/fruit/all")
    .then((response) => {
        res.status(200).send(response.data);
    })
    .catch((error) => {
        res.status(500).send({ message: error.message });
    });
};

export const profile = async (req, res) => {
    try {
        const user = getUserFromToken(req.body.token);

        const foundUser = await User.findOne({ user: user });
        if (!foundUser) {
            return res.status(404).send({ message: "User not found" });
        }
  
        return res.status(200).send(foundUser.fruits);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
  };
  
const getUserFromToken = (token) => {
    return jsonwebtoken.decode(token).user;
}

export const addFavFruit = (req, res) => {
    const user = jsonwebtoken.decode(req.body.token).user;
    User.updateOne({ user: user }, { $push: { "fruits": req.body.fruit } })
    .catch((error) => {
        res.status(500).send({ message: error.message });
    })
    .then(() =>{
        return res.status(200).send();
    });
};

export const removeFavFruit = (req, res) => {
    
};