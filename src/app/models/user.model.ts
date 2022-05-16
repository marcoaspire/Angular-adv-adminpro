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
}