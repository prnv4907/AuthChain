import {Express, Request} from express;
declare namespace Express{
  export interface Request{
    userId?:number
  }
}

