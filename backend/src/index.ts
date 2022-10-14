import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// Passing the body to json
app.use(express.json());

// Routes

app.listen(process.env.PORT || 3000);