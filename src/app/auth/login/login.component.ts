import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  public myForm = this.fb.group({
    email     : [localStorage.getItem('email')|| '', [Validators.required,Validators.email] ],
    password  : ['',[Validators.required]],
    remember  : [localStorage.getItem('email') ? true : false]
  });


  constructor(private router:Router,private fb: FormBuilder,private userService:UserService) { }
  login(){

    console.log(this.myForm.value);
    const { email,password} = this.myForm.value;


    this.userService.login(this.myForm.value).subscribe({

        next: resp =>  {
          console.log(resp);
          if (this.myForm.get('remember')?.value)
          {
            localStorage.setItem('email', this.myForm.get('email')?.value);
          }
          else{
            localStorage.removeItem('email');

          }
        },
        error: err => { 
          Swal.fire('Error',err.error.msg,'error')
          //console.log(err);
          
        }

        /*
        if (resp.ok===true)
        {
          //this.router.navigateByUrl('/dashboard');
          console.log("redirect to home");

        }
        else{
          //TODO: Error msg
          Swal.fire('Error', resp.msg, 'error');
        }
        */
      }
    );


  }

  get emailError():string{
    const errors = this.myForm.get('email')?.errors;
    console.log(errors);
    if (errors?.['required'])
       return "Email is required";
    else if (errors?.['email'])
       return "Email pattern";
    else if (errors?.['emailTaken'])
      return "Email has taken";
    return '';
  }
  isValid(field: string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
}
