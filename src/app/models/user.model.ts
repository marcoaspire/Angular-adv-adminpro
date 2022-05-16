import { environment } from "src/environments/environment";


const base_URL=environment.base_url;

export class User{
    
    constructor(

        public google: boolean,
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: string, 
        public userID?: number

    ){}

    get imageURL(){

        if (this.img?.includes('https')){
            return this.img;
        }


        if (this.img){
            return `${base_URL}/${this.img}`;
        }
        else
            return `${base_URL}/Uploads/users/no-image`;
    }


}