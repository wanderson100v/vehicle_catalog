import {Request, Response} from 'express';
const jwt = require('jsonwebtoken');


export function verifyJWT(req: Request, res:Response, next:any){
    const token = req.headers['x-acess-token'];
    req.body.userId = 1;
    next();
    /*jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded:any)=>{
        if(err) return res.status(401).end();
        req.body.userId = decoded.userId;
        next();
    });*/
}