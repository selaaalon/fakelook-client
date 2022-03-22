import { ITag } from "./ITag";
import { IUser } from "./IUser";

export interface IComment{
    id? : number,
    content : string,
    userId? : number;
    postId : number;
    userTaggedPost? : number[],
    tags? : ITag[],
    user? : IUser
}