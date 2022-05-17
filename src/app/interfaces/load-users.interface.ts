import { User } from "../models/user.model";

export interface LoadUser {
    total:number;
    users:User[];
}
