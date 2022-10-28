import {Request, Response} from 'express';
import { ClienteError, ResponseHelper } from '../helpers';
const jwt = require('jsonwebtoken');


export function verifyJWT(req: Request, res:Response, next:any){
    const token = req.headers['x-acess-token'];
    jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded:any)=>{
        if(err) return ResponseHelper.clienteError(res, ClienteError.Unauthorized, "usuário sem acesso a esta operação")
        req.body.current_user_id = decoded.userId;
        next();
    });
}

export function verifyJWTOnCreateUser(req: Request, res:Response, next:any){
    const token = req.headers['x-acess-token'];
    jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded:any)=>{
        if(!err) req.body.current_user_id = decoded.userId;
        next();
    });
}