import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./auth/auth.js";
import { authMiddleware } from "./auth/auth-middleware.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    const start = Date.now();
    req.time = new Date().toTimeString().slice(0, 8);

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[${req.time}] ${req.hostname} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    });

    next();
});


app.use("/api/auth", authRouter);


app.get("/", (req, res) => {
    res.send("Welcome");
});

mongoose
    .connect(process.env.CONN_URL)
    .then(() => {
        app.listen(4000, () => {
            console.log("localhost:4000 connected");
        });
    })
    .catch(() => {
        console.log("connection failed");
    });
