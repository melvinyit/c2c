import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { car, carStatusCode } from 'src/app/models/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private fb:FormBuilder, private carSrv:CarService, private router:Router) { }

  carForm:FormGroup=this.fb.group({
    vehicle_regis_no:['SAB1234A',Validators.required],
    rental_rate:['0',Validators.required],
    country_code:['SG',Validators.required],
    city:[''],
    year:['1990',Validators.required],
    maker:['api',Validators.required],
    model:['api',Validators.required],
    trim:['api',Validators.required],
    description:['test desc'],
    extras:['test extra']
  });


  ngOnInit() {
  }

  addCar(){
    const car:car = this.carForm.getRawValue();
    this.carSrv.addCar({...car,status:carStatusCode.Active}).then(r=>{
      console.log(r);
      this.router.navigate(['/display/'+r.msg])
    }).catch(e=>console.log(e));
  }


}
