import { VehiclesController } from "../controllers";
import { Vehicle } from "../entities";
import { CustomRouter } from "./Router";

export class VehiclesRouter extends CustomRouter<Vehicle>{

    constructor(connection:any){
        super(new VehiclesController(connection))
    }

    public init(): any {
        this.router.get("/", this.controller.all.bind(this.controller));
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.put("/", this.controller.edit.bind(this.controller));
        this.router.delete("/", this.controller.delete.bind(this.controller));
        return this.router;
    }

}


