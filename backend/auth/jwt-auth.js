import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtkey = process.env.JWT_KEY;

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, username: user.user_name }, jwtkey, {
        expiresIn: "2h",
    });

    return token;
};

const verifyToken = (token) => {
    try {
        const tokenData = jwt.verify(token, jwtkey);
        return tokenData;
    } catch (err) {
        throw new Error("Invalid Token");
    }
};

export { generateAuthToken, verifyToken };
