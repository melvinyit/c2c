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
  LISTALL='/list/all';
  GETONECAR='/get/one/';
  GETCARBYOWNERID='/secure/owner/list';
  UPLOADPROFILEIMAGE='/secure/upload/car-image';

  addCar(car:car):Promise<any>{
    console.log('add car service now');
    //console.log(car);
    return this.http.post(this.BASEURL+this.ADDCAR,car).toPromise();
  }

  getListAllCar():Promise<car[]>{
    console.log('find cars');
    return this.http.get<car[]>(this.BASEURL+this.LISTALL).toPromise();
  }

  getListOwnerCar():Promise<car[]>{
    console.log('find owner cars');
    return this.http.get<car[]>(this.BASEURL+this.GETCARBYOWNERID).toPromise();
  }

  getCarById(carid:number):Promise<car>{
    console.log('find cars');
    return this.http.get<car>(this.BASEURL+this.GETONECAR+carid).toPromise();
  }

  uploadCarImage(formData:FormData):Promise<any>{
    return this.http.post(this.BASEURL+this.UPLOADPROFILEIMAGE,formData).toPromise();
  }

}
