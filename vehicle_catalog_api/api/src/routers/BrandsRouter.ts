import { BrandsController} from "../controllers";
import { Brand } from "../entities";
import { CustomRouter } from "./Router";

export class BrandsRouter extends CustomRouter<Brand>{

    constructor(connection:any){
        super(new BrandsController(connection))
    }

    public init(): any {
        this.router.get("/", this.controller.all.bind(this.controller));
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.put("/:id", this.controller.edit.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
        return this.router;
    }

}


