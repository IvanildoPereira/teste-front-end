import express from "express";
import cors from "cors";
import session from "express-session";
import * as dotenv from 'dotenv';
import { userAuthRouter } from "./routes/userAuthRouter";
import { videoRouter } from "./routes/videoRouter";
import UserAuth from "./models/UserAuth";
dotenv.config();

const app = express();

declare module 'express-session' {
    interface SessionData {
      user: UserAuth | null;
    }
}

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
        resave: false,
        saveUninitialized: true,        
        cookie: {
            maxAge: parseInt(process.env.SESSION_MAX_AGE!),
        },
        
    })
)

// Routes
app.use('/users/', userAuthRouter);
app.use("/video/", videoRouter);

// Route doesn't exist
app.use((req, res, next) => {
    res.status(404).json("Requested route doesn't exist!")
});

app.listen(process.env.PORT || 3000);