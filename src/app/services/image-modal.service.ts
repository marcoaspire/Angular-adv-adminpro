import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  private _hideModal:boolean = true;
  public type!:'users'| 'doctors'|'hospitals';
  public id!:number;
  public img?:string
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }
  openModal(
    type: 'users'| 'doctors'|'hospitals',
    id:number,
    img:string='no-img'
  ){

    this.type=type;
    this.id=id;
    this.img=img;
    this._hideModal=false;
    if (img?.includes('https'))
    {
      this.img=img;
    }
    else if (!img) {
      this.img = `${base_url}/Uploads/${type}/${img}`;
    }
    else {
      this.img = `${base_url}/${img}`;
    }


  }
  closeModal(){
    this._hideModal=true;
  }
  constructor() { }

}
