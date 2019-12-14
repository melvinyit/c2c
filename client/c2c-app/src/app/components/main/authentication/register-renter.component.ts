import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { profile, profileStatusCode, profileTypeCode } from 'src/app/models/profile';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-renter',
  templateUrl: './register-renter.component.html',
  styleUrls: ['./register-renter.component.css']
})
export class RegisterRenterComponent implements OnInit {

  constructor(private profileSrv:ProfilesService,private fb:FormBuilder, private router:Router) { }

  registerRenterForm = this.fb.group({
    username:['defaultusername'],
    password:['tpassword'],
    confirmPassword:['tpassword'],
    email:['t@t.com'],
    contactNo:['84321234'],
    firstName:['myname'],
    lastName:[''],
    address:['']
  })

  ngOnInit() {
  }

  createRenterProfile(){
    //console.log(this.registerRenterForm.value);
    const form = this.registerRenterForm.value;
    const prof : profile = {
    username:form['username'],
    password:form['password'],
    //confirmPassword:form['confirmPassword'],
    email:form['email'],
    contact_no:form['contactNo'],
    first_name:form['firstName'],
    last_name:form['lastName'],
    address:form['address'],
    status:profileStatusCode['Active'],
    type:profileTypeCode['Renter']
    };
    //console.log(prof);
    this.profileSrv.createNewProfile(prof).then(r=>{
      //console.log(r);
      this.router.navigate(['display/'+r.msg]);
    }).then(e=>console.log(e))
  }

}
