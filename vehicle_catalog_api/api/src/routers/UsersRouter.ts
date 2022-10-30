import { UsersController } from "../controllers";
import { User } from "../entities";
import { verifyJWT, verifyJWTOnCreateUser } from "../middlewares/auth";
import { CustomRouter } from "./Router";

export class UsersRouter extends CustomRouter<User>{

    constructor(connection:any){
        super(new UsersController(connection))
    }

    public init(): any {
        this.router.get("/",verifyJWT, this.controller.all.bind(this.controller));
        this.router.get("/search",verifyJWT, this.controller.search.bind(this.controller));
        this.router.post("/",verifyJWTOnCreateUser, this.controller.create.bind(this.controller));
        this.router.post("/login", (this.controller as UsersController).login.bind(this.controller));
        this.router.put("/:id",verifyJWT, this.controller.edit.bind(this.controller));
        this.router.delete("/:id",verifyJWT ,this.controller.delete.bind(this.controller));
        return this.router;
    }

}