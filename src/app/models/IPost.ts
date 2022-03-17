export interface IPost {
    id? : number,
    description? : string,
    imageSorce : string,
    x_Position : number,
    y_Position : number,
    z_Position : number,
  //  location? : { x: number; y: number; z: number };
    // location : 
    date : Date,
    userId? : number
}
