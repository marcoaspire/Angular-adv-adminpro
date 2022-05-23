import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {


  public doctorForm!: FormGroup;
  public hospitals!: Hospital[];
  
  public selectedHospital!:Hospital|undefined;
  public selectedDoctor!:Doctor;
  


  constructor(private fb:FormBuilder, private hospitalService:HospitalService,
     private doctorService:DoctorService, private router:Router,
     private activatedRoute:ActivatedRoute
     ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe(({id}) => {
      
      const doctorID=parseInt(id);

      if (!isNaN(doctorID))
        this.getDoctor(parseInt(id));
       
    });



    this.getHospitals();
    this.doctorForm= this.fb.group({
        "name": ["",[Validators.required]],
        "hospitalID": ["",[Validators.required]]
    });

    this.doctorForm.get('hospitalID')?.valueChanges
    .subscribe( hospitalID => {
      
      this.selectedHospital=this.hospitals.find(h => 
         h.hospitalID===parseInt(hospitalID)
      );
    });

    
  }

  getDoctor(id:number){
    this.doctorService.getDoctorByID(id)
      .pipe(
        delay(100)
      )
      .subscribe( doctor => {
        if (!doctor){
          
          this.router.navigateByUrl(`dashboard/doctors`);
        }
        const {name, hospital:{hospitalID}} = doctor;
        this.doctorForm.setValue({
          name,hospitalID
        });
        this.selectedDoctor=doctor;
        
      });
    
    
  }
  getHospitals(){
    this.hospitalService.loadHospitals()
    .subscribe( res =>
    {
      this.hospitals=res
    })
  }

  saveDoctor(){
    const {name}= this.doctorForm.value;

    if (this.selectedDoctor)
    {
      //update
      const data = {
        ...this.doctorForm.value,
        doctorID:this.selectedDoctor.doctorID
      }
      this.doctorService.updateDoctor(data)
        .subscribe((resp:any) =>{
          
          Swal.fire(
            'Updated!',
            `${name} has been updated.`,
            'success'
          );          
          this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor.doctorID}`);
        })
      ;
    }
    else{
      //new
      this.doctorService.newDoctor(this.doctorForm.value)
        .subscribe((resp:any) =>{
          Swal.fire(
          'Created!',
          `${name} has been created.`,
          'success'
          );          
          this.router.navigateByUrl(`/dashboard/doctor/${resp.doctor.doctorID}`);
      })
    }
    
  }

}
