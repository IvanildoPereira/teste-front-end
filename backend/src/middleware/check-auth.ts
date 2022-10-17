import { NextFunction, Request, Response } from "express";
export const checkAuth = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.session.user){
        res.status(403).send('Not Authenticated!')
    }else{
        next();
    } 
}