import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { car, carStatusCode } from 'src/app/models/car';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private fb:FormBuilder, private carSrv:CarService) { }

  carForm:FormGroup=this.fb.group({
    vehicle_regis_no:['SAB1234A'],
    rental_rate:['0'],
    country_code:['SG'],
    city:[''],
    year:['1990'],
    maker:['api'],
    model:['api'],
    trim:['api'],
    features_codes:[''],
    description:['test desc'],
    faq:['test faq'],
    extras:['test extra'],
    ccp_flag:['N'],
    cdp_flag:['N']
  });


  ngOnInit() {
  }

  addCar(){
    const car:car = this.carForm.getRawValue();
    this.carSrv.addCar({...car,status:carStatusCode.Active});
  }


}
