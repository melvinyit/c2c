import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { profile, profileTiny } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  //TODO: for testing
  //role='O';
  //token='jwt-token';
  //tokenExpire=0;

  constructor(private http:HttpClient) { }
  BASEURL = 'http://localhost:3000/api/profile';
  CREATEPROFILE = '/create';
  AUTHPROFILE = '/authProfile';
  GETPROFILE='/secure/get'


  createNewProfile(p:profile):Promise<any>{
    console.log('calling create new profile');
    return this.http.post(this.BASEURL+this.CREATEPROFILE,p).toPromise();
  }

  authenticateProfile(username:string,password:string):Promise<any>{
    //TODO: authenticate change to promise
    return new Promise((resolve,reject)=>{
      this.http.post<profileTiny>(this.BASEURL+this.AUTHPROFILE,{username,password}).toPromise().then(result=>{
        //this.role=result.type;
        //this.tokenExpire=result.jwt_exp;
        localStorage.setItem('c2c_token', result.jwt_token);
        localStorage.setItem('c2c_role', result.type);
        localStorage.setItem('c2c_jwt_exp', result.jwt_exp.toString());
        //console.log(this.role);
        return resolve(result);
      }).catch(err=>{
        console.log(err);
        return reject({msg:'unable to authnticate user',err});
      });
    });
  }

  logout():boolean{
    localStorage.removeItem('c2c_token');
    localStorage.removeItem('c2c_role');
    localStorage.removeItem('c2c_jwt_exp');
    return true;
  }

  getProfileByToken():Promise<any>{
    //console.log('get profile');
    return this.http.get(this.BASEURL+this.GETPROFILE).toPromise();
  }

  checkRenterProfile():boolean{
    //TODO: verify token is valid
    if (localStorage.getItem('c2c_role')==='R'&&localStorage.getItem('c2c_token')&&parseInt(localStorage.getItem('c2c_jwt_exp')) > (Math.floor(new Date().getTime()/1000)))
      return true;
    return false;
  }
  checkCarOwnerProfile():boolean{
    //TODO: verify token is valid
    if (localStorage.getItem('c2c_role')==='O'&&localStorage.getItem('c2c_token')&&parseInt(localStorage.getItem('c2c_jwt_exp')) > (Math.floor(new Date().getTime()/1000)))
      return true;
    return false;
  }
  checkAdminProfile():boolean{
    //TODO: verify token is valid
    if (localStorage.getItem('c2c_role')==='A'&&localStorage.getItem('c2c_token')&&parseInt(localStorage.getItem('c2c_jwt_exp')) > (Math.floor(new Date().getTime()/1000)))
      return true;
    return false;
  }
}
