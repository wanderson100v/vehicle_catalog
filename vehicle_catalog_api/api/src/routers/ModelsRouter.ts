import { ModelsController} from "../controllers";
import { Model } from "../entities";
import { CustomRouter } from "./Router";

export class ModelsRouter extends CustomRouter<Model>{

    constructor(connection:any){
        super(new ModelsController(connection))
    }

    public init(): any {
        this.router.get("/", this.controller.all.bind(this.controller));
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.put("/:id", this.controller.edit.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
        return this.router;
    }

}


