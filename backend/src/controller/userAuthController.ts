import { Request } from "express";
import { Response } from "express";
import UserAuth from "../models/UserAuth";

const login = async (req: Request, res: Response) => {
    let {name, email} = req.body;
    let user: UserAuth = new UserAuth(name, email);
    req.session.user = user;
    res.status(200).json({ message: "Created with sucess!!", user, expiresAt: req.session.cookie.expires})
}

const loggedIn = async (req: Request, res: Response) => {
    if(req.session.user){        
        res.status(200).json({ user: req.session.user, expiresAt: req.session.cookie.expires })
    }
    else res.status(200).json({message: "Not Logged"})
}

const logout = async (req: Request, res: Response) => {
    req.session.destroy((err)=>{})
    res.status(200).json({message: "Logout with Success"});
}

export {
    login,
    loggedIn,
    logout
}