import {Request, Response} from 'express';
import Repository from '../repositories/Repository';

export abstract class Controller<T> {

    protected repository: Repository<T>;

    constructor(repository: Repository<T>){
        this.repository = repository;
    }

    public abstract all(req: Request, res:Response):void;

    public abstract create(req: Request, res:Response):void;

    public abstract edit(req: Request, res:Response):void;

    public abstract delete(req: Request, res:Response):void;

}
