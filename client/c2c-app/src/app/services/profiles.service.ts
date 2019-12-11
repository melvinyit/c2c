import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  //TODO: for testing
  role='O';
  token='jwt-token';

  constructor(private http:HttpClient) { }
  BASEURL = 'http://localhost:3000/api/profile';
  CREATEPROFILE = '/create';


  createNewProfile(p:profile):Promise<any>{
    console.log('calling create new profile');
    return this.http.post(this.BASEURL+this.CREATEPROFILE,p).toPromise();
  }

  authenticateProfile(username:string,password:string):boolean{
    //TODO: authenticate
    if(username==='user' && password==='pass'){
      this.role='R';
      this.token='newvalidtoken';
      return true;
    }
    return false;
  }

  checkRenterProfile():boolean{
    if (this.role==='R'&&this.token==='newvalidtoken')
      return true;
    return false;
  }
}
