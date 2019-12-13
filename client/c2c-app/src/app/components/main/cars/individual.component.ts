import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { car } from 'src/app/models/car';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private carSrv:CarService) { }
  car:car=null;

  ngOnInit() {
    const carid=this.ar.snapshot.params['carid'];
    //console.log(carid);
    this.getCarDetails(carid);
  }

  getCarDetails(carid:number) {
    this.carSrv.getCarById(carid).then(r=>{
      //console.log(r);
      this.car=r;
    }).catch(e=>console.log(e));
  }

}
