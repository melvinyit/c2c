import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { carStatus } from 'src/app/models/car';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css']
})
export class ManageCarComponent implements OnInit {

  constructor(private router:Router,private ar:ActivatedRoute,private carSrv:CarService, private fb:FormBuilder) { }

  car = null;
  carStatus=carStatus;
  carForm:FormGroup=this.fb.group({
    car_id:['',Validators.required],
    rental_rate:['',Validators.required],
    country_code:['',Validators.required],
    city:[''],
    year:['',Validators.required],
    maker:['',Validators.required],
    model:['',Validators.required],
    trim:['',Validators.required],
    description:[''],
    extras:['']
  });

  ngOnInit() {
    console.log(this.ar.snapshot.params.carid);
    this.getCar(this.ar.snapshot.params.carid);
  }

  getCar(carid:number){
    this.carSrv.getCarById(carid).then(r=>{
      console.log(r);
      this.car = r
    }).catch(e=>console.log(e));
  }

  gotoUploadImage(carid:number){
    console.log('TODO upload car image');
    this.router.navigate(['/owner/manage-car-image/'+carid]);
  }

  updateCar(){
    console.log('TODO update car info');
  }

  deleteCar(carid:number){
    console.log('TODO delete car');
  }

}
