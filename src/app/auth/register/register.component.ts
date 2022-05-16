import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
//
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formSumbitted = false;

  public myForm = this.fb.group({
    name      : ['Selene', [Validators.required,Validators.minLength(2)] ],
    email     : ['selene@gmail.com', [Validators.required,Validators.email] ],
    password  : ['123456',[Validators.required]],
    password2 : ['123456',[Validators.required]],
    terms     : [false,[Validators.requiredTrue]],



  },{ validators: this.matchPassword('password','password2') });

  constructor(private fb: FormBuilder, private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }


  createUser(){
    this.formSumbitted = true;
    console.log(this.myForm.value);

    if (this.myForm.valid){
      this.userService.createUser(this.myForm.value)
      .subscribe({
        next: resp =>  {
          Swal.fire('Saved','User created','success');
          this.router.navigateByUrl('login');
        },
        error: err => {
          Swal.fire('Error',err.error.msg,'error')}
        
      });
      
    }
    else{
      console.log('form wrong');
      
    }
    
  }

  isValid(field: string){
    if (field == 'terms')
    {

      return !this.myForm.get('terms')?.value && this.myForm.touched;
    }

    const pass1 = this.myForm.get('password')?.value;
    const pass2 = this.myForm.get('password2')?.value;


    if (field == 'password2')
    {
      //return this.myForm.controls[field].errors && this.myForm.controls[field].touched || this.myForm.errors;
      return pass1 != pass2
    }
    
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  get passwordConfirmError():string{

    /*
    const errors = this.myForm.get('password2')?.errors;

    console.log("fdsfssdfsd");
    if (this.myForm.get('password2')?.value != this.myForm.get('password')?.value)
    {
       
      return "The password confirmation does not match";
    }
    if (errors?.['required'])
       return "Password is required";
    return '';
    */

    
    return "The password confirmation does not match";
 



  }

   matchPassword  (p1:string,p2:string) {

    return (formGroup:FormGroup) =>{
      if (formGroup.value.Password === formGroup.value.ConfirmPassword &&  formGroup.value.Password!= '' )
        return true;
      return { notmatched: true };
    }
    
  }

}
