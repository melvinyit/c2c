import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-carpark',
  templateUrl: './carpark.component.html',
  styleUrls: ['./carpark.component.css']
})
export class CarparkComponent implements OnInit {

  constructor(private carSrv:CarService) { }

  carparklist = null
  ngOnInit() {
    this.carSrv.getCarPark().then(aaa=>{
      console.log('length:',aaa.items.length);
      console.log('length:',aaa.items[0].carpark_data.length);
      console.log('length:',aaa.items[0].carpark_data[0].carpark_info.length);
      this.carparklist = aaa.items[0].carpark_data;
      //console.log('length:',this.carparklist.length);
      console.log(this.carparklist[0]);
      //this.carparklist = null;
    }).catch(e=>console.log(e));
  }

  

}
