import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  constructor(private profSrv:ProfilesService,private fb:FormBuilder) { }

  profile = null;
  profileForm:FormGroup = this.fb.group({
    profile_id:[''],
    email:['t@t.com'],
    contact_no:['84321234'],
    first_name:['myname'],
    last_name:[''],
    address:['']
  });

  ngOnInit() {
    this.profSrv.getProfileByToken().then(r=>{
      //console.log(r);
      this.profile = r;
      this.profileForm.controls['profile_id'].setValue(r.profile_id);
    }).catch(e=>console.log(e));
  }

  updateProfile(){
    console.log('update profile');
    this.profSrv.updateProfile(this.profileForm.getRawValue()).then(r=>{
      console.log(r);
    }).catch(e=>console.log(e));
  }
}
