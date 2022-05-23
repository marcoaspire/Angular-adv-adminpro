import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { map, catchError,tap,delay } from "rxjs/operators";
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const base_url= environment.base_url;


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit,OnDestroy {

  public doctors: Doctor[]=[];
  public loading: boolean=true;
  public imgSubs!:Subscription;

  public doctorsAux!:Doctor[];

  constructor(private doctorsService:DoctorService,private imageModalService:ImageModalService,
    private searchService:SearchService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDoctors();
    //refresh user if we receive an observable because the image was updated
    this.imgSubs=this.imageModalService.newImage.subscribe(img => this.loadDoctors());
  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  loadDoctors(){
    this.loading =true;

    this.doctorsService.loadDoctors()
    .subscribe(doctors=> {
      console.log("");
      this.doctors=doctors;
      this.doctorsAux=doctors;
      this.loading =false;
    });
  }


  update(doctor:Doctor)
  { 
    this.doctorsService.updateDoctor(doctor)
    .subscribe({
      next: resp => 
      {
        Swal.fire(
        'Updated!',
        'Doctor has been updated.',
        'success'
        );  
        this.loadDoctors();

      }
      ,
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        }) 
      
        ,console.log(err)
      }
      
    });

  }

  delete(doctor:Doctor)
  {
    return Swal.fire({
      title: `Are you sure you want to delete "${doctor.name}"?`,
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => 
    {
      if (result.isConfirmed) 
      {
        this.doctorsService.deleteDoctor(doctor)
        .subscribe({
          next: resp => 
          {
            Swal.fire(
            'Deleted!',
            `Doctor ${doctor.name} has been deleted.`,
            'success'
            );  
            this.loadDoctors();

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

  openModal(doctor: Doctor){
    this.imageModalService.openModal('doctors',doctor.doctorID!,doctor.img!);
  }

  search(term:string){
    
    if (term.length===0)
    {
      return this.doctors=this.doctorsAux;
    }
    return this.searchService.search('doctors',term)
      .subscribe( d=> 
        this.doctors= d
      );  
  }
  

}
