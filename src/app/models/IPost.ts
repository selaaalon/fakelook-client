import { IComment } from "./IComment";
import { ILike } from "./ILike";
import { ITag } from "./ITag";
import { IUser } from "./IUser";

export interface IPost {
    id? : number,
    description? : string,
    imageSorce : string,
    x_Position : number,
    y_Position : number,
    z_Position : number,
    location? : { x: number; y: number; z: number };
    likes? : ILike[],
    userTaggedPost? : any[],
    tags? : ITag[],
    comments? : IComment[],
    date : Date,
    userId? : number
}
