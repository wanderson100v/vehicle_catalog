import express from "express"
const fileUpload = require("express-fileupload");
import { Knex } from "knex";
import connection from "./database/connection";
import { VehiclesRouter, BrandsRouter, ModelsRouter } from "./routers";
import { UsersRouter } from "./routers/UsersRouter";
var cors = require('cors')
const path = require('path')

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
            console.log("server online");
        });
    }
    
    private middleware(){
        this.server.use(express.json());
        this.server.use(fileUpload({createParentPath: true,}));
        this.server.use(cors());
        this.server.use(express.static(__dirname +'/public'));
    }

    private routes(){
        this.server.use('/users',new UsersRouter(this.databaseConnection).init());
        this.server.use('/vehicles',new VehiclesRouter(this.databaseConnection).init());
        this.server.use('/vehicles/brands',new BrandsRouter(this.databaseConnection).init());
        this.server.use('/vehicles/models',new ModelsRouter(this.databaseConnection).init());
    }

}