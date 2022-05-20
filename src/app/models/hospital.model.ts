import { environment } from "src/environments/environment";


const base_URL=environment.base_url;


interface _hospitalUser{
    _id:number;
    name:string;
}

export class Hospital{
    constructor(

        public name:       string,
        public hospitalID?: number,
        public img?:        string,
        public user?:       _hospitalUser
        //public userID?:     number,
    ){}

    

}