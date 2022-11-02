export interface Vehicle{
    id?:number;
    image_url?:string;
    price:number,
    name: string;
    created_at?: Date;
    updated_at?: Date;
    model_id: number;
}