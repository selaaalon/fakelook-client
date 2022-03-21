import { ITag } from "./ITag";

export interface IComment{
    id? : number,
    content : string,
    userId? : number;
    postId : number;
    userTaggedPost? : number[],
    tags? : ITag[]
}