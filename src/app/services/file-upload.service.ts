import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


  //fetch instead http

  async updatePicture(
    file:File,
    type: 'users'| 'doctors'|'hospitals',
    id: number
  )
  {
    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();

      formData.append('image',file);

      const resp = await fetch(url,{
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      
      if (data.ok){
        return data.user.img;
      }
      else{
        console.log(data.msg);
        return false;
      }

      console.log(data.user.img);
      
      

      return true;


    } catch (error) {
      console.log("Error");
      
      console.log(error);
      
      return false;
    }
  }





}
