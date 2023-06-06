import jsonwebtoken from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        res.status(403).send({ message: "No token provided" });
        return;
    }

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET | "secret", (error) => {
        if (error) {
            res.status(401).send({ message: error.message });
            return;
        }
    });

    next();
};