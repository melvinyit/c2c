import { Component, OnInit } from '@angular/core';
import { profile, profileStatusCode, profileTypeCode } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profiles.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.css']
})
export class RegisterOwnerComponent implements OnInit {

  constructor(private profileSrv:ProfilesService,private fb:FormBuilder,private router:Router) { }

  registerOwnerForm = this.fb.group({
    username:['ownertest'],
    password:['pass'],
    confirmPassword:['tpassword'],
    email:['t@ta.com'],
    contactNo:['84321234'],
    firstName:['myname'],
    lastName:[''],
    address:['']
  })

  ngOnInit() {
  }

  createOwnerProfile(){
    //console.log(this.registerRenterForm.value);
    const form = this.registerOwnerForm.value;
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
    type:profileTypeCode["Car Owner"]
    }
    this.profileSrv.createNewProfile(prof).then(r=>{
      //console.log(r);
      this.router.navigate(['display/'+r.msg]);
    }).then(e=>console.log('error',e))
  }

}
