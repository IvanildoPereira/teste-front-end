import express from "express";
import cors from "cors";
import session from "express-session";
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

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        saveUninitialized: false,
        resave: true,
        cookie: {
            sameSite: "none",
            httpOnly: true,
            maxAge: parseInt(process.env.SESSION_MAX_AGE!),
        },
        
    })
)

// Routes

app.listen(process.env.PORT || 3000);