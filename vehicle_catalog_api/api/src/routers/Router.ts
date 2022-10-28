import {Router} from 'express';
import { Controller } from '../controllers/Controller';

export abstract class CustomRouter<T>{
    protected router: any;
    protected controller: Controller<T>

    constructor(controller: Controller<T>){
        this.router = Router();
        this.controller = controller;
    }

    public abstract init(connection:any):any;
}