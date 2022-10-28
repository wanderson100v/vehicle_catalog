import express from "express"
import { Knex } from "knex";
import connection from "./database/connection";
import { VehiclesRouter, BrandsRouter } from "./routers";

export class App{

    private server: express.Application;
    private databaseConnection: Knex;

    constructor(){
        this.server = express();
        this.databaseConnection = connection;
        this.middleware();
        this.routes();
    }

    public listen(){
        this.server.listen(3000, ()=>{
            console.log("server online")
        });
    }
    
    private middleware(){
        this.server.use(express.json())
    }

    private routes(){
        this.server.use('/vehicles',new VehiclesRouter(this.databaseConnection).init())
        this.server.use('/vehicles/brands',new BrandsRouter(this.databaseConnection).init())
    }

}