import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// config cors
app.use(cors({
    origin: process.env.FRONEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
}));

// Passing the body to json
app.use(express.json());

// Routes

app.listen(process.env.PORT || 3000);