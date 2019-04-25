import {LastLogin} from "./last-login.interface";

export interface UserDetails {
  details: any[];
  last_login: LastLogin[];
  owner: {owner: string}[];
}
