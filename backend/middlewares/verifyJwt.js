import jsonwebtoken from "jsonwebtoken";

export const verifyJwt = (req, res) => {
    const token = req.body.token;

    if (!token) {
        res.send({ message: "No token provided" });
        return;
    }

    jsonwebtoken.verify(token, "secret", (error) => {
        if (error) {
            res.send({ message: error.message  });
        }
    });
};