import express from "express";
import { comparePassword, hashPassword } from "./password-hash.js";
import User from "../models/user.js";
import { generateAuthToken } from "./jwt-auth.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const authRouter = express.Router();
authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ user_name: username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const match = comparePassword(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    const token = generateAuthToken(user);
    res.status(200).json({ token });
});

authRouter.post("/register", async (req, res) => {
    const { username, password, department, secret } = req.body;

    if (secret !== process.env.REGISTER_SECRET) {
        return res.status(401).json({ message: "You are not authorized" });
    }

    const exists = await User.findOne({ user_name: username });
    if (exists) {
        return res.status(404).json({ message: "User already exists" });
    }
    const user = User({
        user_id: uuidv4(),
        user_name: username,
        password: hashPassword(password),
        department: department,
    });
    await user.save();
    res.status(201).json({ message: "User Created" });
});

export default authRouter;
