import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-manage-profile-image',
  templateUrl: './manage-profile-image.component.html',
  styleUrls: ['./manage-profile-image.component.css']
})
export class ManageProfileImageComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder, private profSrv:ProfilesService) { }

  @ViewChild('profileImageFile', { static: false })
  profileImageFile: ElementRef;

  uploadImageForm:FormGroup=this.fb.group({
    //profile_id:[''],
    profileImage:['',Validators.required]
  });

  ngOnInit() {
  }

  onUpload(){
    console.log(this.uploadImageForm.value);
    const formData = new FormData();
    formData.set('profileImage', this.profileImageFile.nativeElement.files[0]);
    this.profSrv.uploadProfileImage(formData).then(r=>{
      console.log(r);
      this.router.navigate(['/renter/manage-profile']);
    }).catch(e=>{console.log(e);});
  }

}
