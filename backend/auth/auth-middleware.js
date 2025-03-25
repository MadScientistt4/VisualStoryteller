import express from "express";
import { verifyToken } from "./jwt-auth.js";

export const authMiddleware = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const token = auth.split(" ")[1];
    try {
        const tokenData = verifyToken(token);
        req.user = tokenData;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
