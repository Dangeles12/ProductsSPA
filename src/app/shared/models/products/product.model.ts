import { BaseModel } from "../baseModel.model";

export interface Product extends BaseModel{
    name:string;
    description:string;
    price:number;
    quantity:number;
    image:string;
}