import { environment } from "src/environments/environment";
import { Hospital } from "./hospital.model";


const base_URL=environment.base_url;


interface _DoctorUser{
    _id:number;
    name:string;
}


export class Doctor{
    constructor(

    public name:       string,
    public hospital:   Hospital,
    public doctorID?:   number,
    public img?:        null,
    public user?:       _DoctorUser,

        
    ){}

    

}