import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { PageEvent } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router:Router, private ar:ActivatedRoute, private carSrv:CarService, private fb:FormBuilder) { }
  listOfCar=[];

  currentpage=1;
  total=0;
  searchcri = null;

  ngOnInit() {
    const path = this.ar.routeConfig.path;
    console.log(path);

    if(path.match('list-cars/search')){
      console.log('regex search');
      const search = this.ar.snapshot.params;
      this.searchcri = {...search};
      console.log(this.searchcri);
      this.getListOfAllCarSearch(this.searchcri);
      this.getCountAllCar(this.searchcri);
    }
    if(path.match('list-cars/all')){
      console.log('regex all');
      this.getListOfAllCar();
      this.searchcri = {minrate: "0", maxrate: "9999", model: "", search: "true"};
      this.getCountAllCar(this.searchcri);
    }
  }

  gotoPrevious(){
    this.currentpage = Math.max(+this.currentpage - 1,1);
    //console.log(this.currentpage);
    //console.log(this.searchcri);
    this.searchcri.page  = this.currentpage.toString();
    //console.log(this.searchcri);
    this.getListPage(this.searchcri);
  }
  gotoNext(){
    this.currentpage = Math.min(+this.currentpage + 1,Math.ceil(+this.total/5));
    this.searchcri.page  = this.currentpage.toString();
    //console.log(this.searchcri);
    this.getListPage(this.searchcri);
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
    this.searchcri = params;
    this.carSrv.getListAllCarSearch(params).then(r=>{
      //console.log('result',r);
      this.listOfCar=r;
      console.log(this.listOfCar);
    }).catch(e=>console.log(e));
  }

  getListPage(params){
    //console.log(params);
    //this.searchcri = params;
    this.carSrv.getListAllCarSearch(params).then(r=>{
      //console.log('result',r);
      this.listOfCar=r;
      console.log(this.listOfCar);
    }).catch(e=>console.log(e));
  }

  getCountAllCar(params){
    this.carSrv.countCar(params).then(r=>{
      console.log('result',r);
      this.total=r.total;
      console.log(this.listOfCar);
    }).catch(e=>console.log(e));
  }

  gotoCarDetail(carid:number){
    console.log(carid);
    this.router.navigate(['list-car/'+carid]);
  }
}
