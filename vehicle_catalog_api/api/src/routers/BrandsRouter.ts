import { BrandsController} from "../controllers";
import { Brand } from "../entities";
import { verifyJWT } from "../middlewares/auth";
import { CustomRouter } from "./Router";

export class BrandsRouter extends CustomRouter<Brand>{

    constructor(connection:any){
        super(new BrandsController(connection))
    }

    public init(): any {
        this.router.get("/",verifyJWT, this.controller.all.bind(this.controller));
        this.router.get("/search", this.controller.search.bind(this.controller));
        this.router.post("/",verifyJWT, this.controller.create.bind(this.controller));
        this.router.put("/:id",verifyJWT, this.controller.edit.bind(this.controller));
        this.router.delete("/:id",verifyJWT, this.controller.delete.bind(this.controller));
        return this.router;
    }

}


