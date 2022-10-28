export interface User{
    id?:number;
    is_super_user?:boolean;
    email:string;
    password: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
}