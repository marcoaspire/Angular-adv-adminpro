import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public myForm!:FormGroup;
  public user!:User;
  public imageUpload!:File;
  public imgTemp:any;

  constructor(private fb:FormBuilder,private userService:UserService, private fileUploadService:FileUploadService) { 
      this.user=userService.user;
  }

  ngOnInit(): void {
    this.myForm= this.fb.group({
      name: [this.user.name,Validators.required],
      email: [this.user.email,[Validators.required,Validators.email]]
    });
  }

  updateProfile(){
    console.log(this.myForm.value);
    this.userService.updateUser(this.myForm.value)
    .subscribe({

      
        next: resp =>  {
          const {name, email} = this.myForm.value;
          this.user.name= name;
          this.user.email= email;
          Swal.fire('Saved', 'User uploaded', 'success');
        },
        error: err => {
          Swal.fire('Error',err.error.msg,'error')
        }
        
      
      
    });
    
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
    this.fileUploadService.updatePicture(this.imageUpload,'users',this.user.userID|| -1)
    .then(img => {
      this.user.img = img,
      Swal.fire('Saved', 'Image uploaded', 'success');

    })
    .catch(err => {
        
        console.log(err);
        
        //Swal.fire('Error',err.error.msg,'error')
      }
    )
    
  }




}
