import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit,OnDestroy {

  public hospitals: Hospital[]=[];
  public loading: boolean=true;
  public imgSubs!:Subscription;

  public hospitalsAux!:Hospital[];


  constructor(private hospitalsService:HospitalService,private imageModalService:ImageModalService,private searchService:SearchService) { }

  ngOnInit(): void {

    this.loadHospitals();
    //refresh user if we receive an observable because the image was updated
    this.imgSubs=this.imageModalService.newImage.subscribe(img => this.loadHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadHospitals(){
    this.loading =true;

    this.hospitalsService.loadHospitals()
    .subscribe(hospitals=> {
      console.log("hospitals");
      this.hospitals=hospitals;
      this.hospitalsAux=hospitals;
      console.log(hospitals);
      console.log(hospitals.length);
      this.loading =false;
    });
  }

  update(hospital:Hospital)
  {
    
    this.hospitalsService.updateHospital(hospital.hospitalID!,hospital.name)
    .subscribe({
      next: resp => 
      {
        Swal.fire(
        'Updated!',
        'Hospital has been updated.',
        'success'
        );  
        this.loadHospitals();

      }
      ,
      error: err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      }) 
    });

  }

  delete(hospital:Hospital)
  {
    return Swal.fire({
      title: `Are you sure you want to delete "${hospital.name}"?`,
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
        this.hospitalsService.deleteHospital(hospital.hospitalID!)
        .subscribe({
          next: resp => 
          {
            Swal.fire(
            'Deleted!',
            'Hospital has been deleted.',
            'success'
            );  
            this.loadHospitals();

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


  async openSweetAlert(){
    const {value} = await Swal.fire<string>({
      title: "New hospital",
      input: 'text',
      inputLabel: 'Type the name of the new hospital',
      inputPlaceholder: 'Name of the hospital',
      showCancelButton: true,
    })
    if (value?.trim().length! >0){
      this.hospitalsService.newHospital(value!)
      .subscribe({
        next: (resp:any) => 
          {
            Swal.fire(
            'Created!',
            'Hospital has been created.',
            'success'
            );  
            this.hospitals.push(resp.hospital);

          }
          ,
          error: err => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          }) 
        })
      }
  }


  openModal(hospital: Hospital){
    this.imageModalService.openModal('hospitals',hospital.hospitalID!,hospital.img);

  }

  search(term:string){

    console.log(term);
    
    if (term.length===0)
    {
      return this.hospitals=this.hospitalsAux;
    }
    return this.searchService.search('hospitals',term)
      .subscribe( h=> 
        this.hospitals=  h
      );  
  }



}
