import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private fb:FormBuilder,private carSrv:CarService,private router:Router) { }

  searchForm:FormGroup=this.fb.group({
    minrate:['0'],
    maxrate:['100'],
    model:['hyndai']
  });

  ngOnInit() {

  }

  search(){
    const value = this.searchForm.getRawValue();
    value.search = true;
    console.log(value);
    this.router.navigate(['/list-cars/search',value])
  }



}
