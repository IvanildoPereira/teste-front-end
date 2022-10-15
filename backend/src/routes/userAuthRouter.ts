import { Router } from "express";
import { loggedIn, login, logout } from "../controller/userAuthController";

const userAuthRouter = Router();

userAuthRouter.get('/login', loggedIn);
userAuthRouter.post('/login', login);
userAuthRouter.get('/logout', logout);

export {
    userAuthRouter
}