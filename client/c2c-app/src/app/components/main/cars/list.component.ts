import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router:Router, private ar:ActivatedRoute, private carSrv:CarService) { }
  listOfCar=[];

  ngOnInit() {
    const path = this.ar.routeConfig.path;
    console.log(path);

    if(path.match('list-cars/search')){
      console.log('regex search');
      const search = this.ar.snapshot.params;
      console.log({...search});
      this.getListOfAllCarSearch({...search});

    }
    if(path.match('list-cars/all')){
      console.log('regex all');
      this.getListOfAllCar();
    }
  }

  getListOfAllCar(){
    this.carSrv.getListAllCar().then(r=>{
      //console.log('result',r);
      this.listOfCar=r;
      console.log(this.listOfCar);
    }).catch(e=>console.log(e));
  }

  getListOfAllCarSearch(params){
    console.log(params);
    this.carSrv.getListAllCarSearch(params).then(r=>{
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
