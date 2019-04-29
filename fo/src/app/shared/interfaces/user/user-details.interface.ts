import {LastLogin} from "./last-login.interface";

export interface UserDetails {
    details: {
      publisher: {},
      lastLogin: LastLogin,
      owner: string
    }
}
