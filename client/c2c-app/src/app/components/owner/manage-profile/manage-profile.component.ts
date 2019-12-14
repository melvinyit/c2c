import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  constructor(private profSrv:ProfilesService,private fb:FormBuilder, private router:Router) { }

  profile = null;
  profileForm:FormGroup = this.fb.group({
    profile_id:[''],
    email:[''],
    contact_no:[''],
    first_name:[''],
    last_name:[''],
    address:['']
  });

  ngOnInit() {
    this.profSrv.getProfileByToken().then(r=>{
      //console.log(r);
      this.profile = r;
      this.profileForm.controls['profile_id'].setValue(r.profile_id);
      this.profileForm.controls['email'].setValue(r.email);
      this.profileForm.controls['contact_no'].setValue(r.contact_no);
      this.profileForm.controls['first_name'].setValue(r.first_name);
      this.profileForm.controls['last_name'].setValue(r.last_name);
      this.profileForm.controls['address'].setValue(r.address);
    }).catch(e=>console.log(e));
  }

  updateProfile(){
    console.log('update profile');
    this.profSrv.updateProfile(this.profileForm.getRawValue()).then(r=>{
      console.log(r);
      this.router.navigate(['display/'+r.msg]);
    }).catch(e=>console.log(e));
  }

}
