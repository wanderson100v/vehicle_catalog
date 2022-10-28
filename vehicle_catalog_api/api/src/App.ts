import express from "express"
import connection from "./database/connection";
import { VehiclesRouter } from "./routers";

export class App{

    private server: express.Application;
    private databaseConnection: any;

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
    }

}