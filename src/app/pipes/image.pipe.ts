import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_URL=environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users'| 'doctors' | 'hospitals'): string {
    
    if (img?.includes('https')){
      return img;
    }
    if (img){
      
        return `${base_URL}/${img}`;
    }
    else
        return `${base_URL}/Uploads/${type}/no-image`;
      
  }

}
