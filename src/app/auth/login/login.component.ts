import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

declare const gapi:any;
declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  auth2!:any;
  public myForm = this.fb.group({
    email     : [localStorage.getItem('email')|| 'selene@gmail.com', [Validators.required,Validators.email] ],
    password  : ['123456',[Validators.required]],
    remember  : [localStorage.getItem('email') ? true : false]
  });


  constructor(private router:Router,private fb: FormBuilder,private userService:UserService,private ngZone:NgZone) { }
  ngOnInit(): void {
     this.init();
  }


  login(){
    //console.log(this.myForm.value);
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
        this.router.navigateByUrl('/dasboard');
      },
      error: err => { 
        Swal.fire('Error',err.error.msg,'error')
        //console.log(err);
      }
    });
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

  //old google version //*** Start */

  renderButton() {
    
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      //'onsuccess': 
      //'onfailure': 
    });
    //this.startApp();
  }
  
  startApp(){
    gapi.load('auth2', () =>{
      this.auth2 = gapi.auth2.init({
        client_id: '735068007746-ke07bken6npfkrsrlml5v37q0kucdf8j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignin(document.getElementById('buttonDiv'));
    });
  }
  
  attachSignin(element:any){
    this.auth2.attachClickHandler(element,{},
      (googleUser:any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token)
          .subscribe(resp =>{
            this.router.navigateByUrl('/dasboard');
          });
      }
    )
  }

  //old google version //*** END */

  //new google login
  init() {
    google.accounts.id.initialize({
      client_id: "735068007746-ke07bken6npfkrsrlml5v37q0kucdf8j.apps.googleusercontent.com",
      callback: (response:any) => {
        this.userService.loginGoogle(response.credential).subscribe(
          {
            next: resp => {
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/dasboard');    
              });
            },
            error: err => { 
              Swal.fire('Error','Google login error','error')
              
            } 
          });
      }
      //this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    //google.accounts.id.prompt(); // also display the One Tap dialog
  }


}
