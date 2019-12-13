import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.css']
})
export class ManageCarComponent implements OnInit {

  constructor(private router:Router,private ar:ActivatedRoute,private carSrv:CarService) { }

  car = null;

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

}
