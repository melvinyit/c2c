import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  constructor(private router:Router,private carSrv:CarService) { }

  carlist = [];

  ngOnInit() {
    this.getCarList();
    
  }

  getCarList(){
    console.log('classing');
    this.carSrv.getListOwnerCar().then(r=>{
      console.log(r);
      this.carlist = r;
    }).catch(e=>console.log(e));
  }

  gotoManageCar(carid:number){
    this.router.navigate(['/owner/manage-car/'+carid]);
  }

}
