import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router:Router, private ar:ActivatedRoute, private carSrv:CarService) { }
  listOfCar:car[]=[]

  ngOnInit() {
    const path = this.ar.routeConfig.path;
    console.log(path);
    this.getListOfAllCar();
  }

  getListOfAllCar(){
    this.carSrv.getListAllCar().then(r=>{
      //console.log('result',r);
      this.listOfCar=r;
      console.log(this.listOfCar);
    }).catch(e=>console.log(e));
  }

  gotoCarDetail(carid:number){
    console.log(carid);
    this.router.navigate(['list-car/'+carid]);
  }
}
