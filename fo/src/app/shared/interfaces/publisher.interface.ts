import {Site} from "./site.interface";


export interface Publisher {
  sites: Site[],
  username: string,
  _id: number
}
