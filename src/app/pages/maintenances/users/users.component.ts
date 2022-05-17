import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit,OnDestroy {

  public totalUsers=0;
  public users!:User[];
  public usersAux!:User[];
  public from=1;
  public loading:boolean=true;
  public imgSubs!:Subscription;


  constructor(private userService:UserService, private searchService:SearchService,private imageModalService:ImageModalService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    //refresh user if we receive an observable because the image was updated
    this.imgSubs=this.imageModalService.newImage.subscribe(img => this.loadUsers());
  }


  loadUsers()
  {
    this.loading=true;

    this.userService.loadUsers(this.from)
    .subscribe( ({total, users}) =>{
      this.totalUsers=total;
      this.users=users;
      this.usersAux=users;
      this.loading=false;
      
    });
    
  }


  changePage(value:number){
    this.from+=value;

    if (this.from<1)
    {
      this.from=1;
    }
    else if (this.from > (this.totalUsers/5 + 1) )
    {
      this.from -= value ;

    }
    this.loadUsers();
    

  }


search(term:string){

  if (term.length===0)
  {
    return this.users=this.usersAux;
  }
  return this.searchService.search('users',term)
    .subscribe( users=> 
      this.users=  users
    );  
}

deleteUser(user:User){

  if (user.userID === this.userService.id)
  {
    return Swal.fire('Error','You cannot delete yourself','error');
  } 

  return Swal.fire({
    title: `Are you sure you want to delete "${user.name}"?`,
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUser(user).subscribe({
        next: resp => 
        {
          Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
          );  
          this.loadUsers();

        }
        ,
        error: err => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        }) 
      });
    }
  })
    
}
changeRole(user:User)
{
  this.userService.saveUser(user)
    .subscribe(console.log);
    
}
openModal(user:User){
  const {img,userID} = user;
  
  this.imageModalService.openModal("users",userID!,img);
}

}
