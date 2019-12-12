import { Injectable } from '@angular/core';
import { car } from '../models/car';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  BASEURL = 'http://localhost:3000/api/car';
  ADDCAR='/secure/add';

  addCar(car:car):Promise<any>{
    console.log('add car service now');
    console.log(car);
    return this.http.post(this.BASEURL+this.ADDCAR,car).toPromise();
  }
}
