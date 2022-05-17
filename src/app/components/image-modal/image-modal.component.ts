import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  public imageUpload!:File;
  public imgTemp:any;


  constructor(public imageModalService:ImageModalService,private fileUploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imageModalService.closeModal();
    this.imgTemp=null;
  }
  changeImage(event:any){
    //if an image is selected set that image in imgTemp
    this.imageUpload=event.target?.files[0];    
    if (!event.target?.files[0])
    {
      return this.imgTemp=null;
      
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imageUpload);  

    reader.onloadend = () =>{
      return this.imgTemp= reader.result;
      
    }
    return ;
  }

  uploadPicture(){

    const id = this.imageModalService.id;
    const type = this.imageModalService.type;


    this.fileUploadService.updatePicture(this.imageUpload,  type  ,id)
    .then(img => {
      Swal.fire('Saved', 'Image uploaded', 'success');
      //send an observable with the image
      this.imageModalService.newImage.emit(img);
      this.closeModal();
    })
    .catch(err => {
        
        console.log(err);
        
        //Swal.fire('Error',err.error.msg,'error')
    });
  }

}
