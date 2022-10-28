export interface Vehicle{
    id?:number;
    image_url:string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
    brand_id: number;
    model_id: number;
}