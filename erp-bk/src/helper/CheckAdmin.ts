import { NextFunction, Request, Response } from "express";

export const Check_admin = (req:Request, res:Response, next:NextFunction)=>{
    try{
        const role = req.role;
        if(role === 'admin'){
            next()
        }else{
            res.status(401).send({message : 'Unauthorized'})
        }
    }catch(err){
        res.status(401).send({message : 'Unauthorized'})
    }
}