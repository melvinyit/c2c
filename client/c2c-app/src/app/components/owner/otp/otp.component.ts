import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OTPComponent implements OnInit {

  constructor(private fb:FormBuilder,private profSrv:ProfilesService,private router:Router) { }

  otpForm:FormGroup=this.fb.group({
    code:[]
  });

  ngOnInit() {
  }

  authOTP(){
    this.profSrv.authOTPcode(this.otpForm.value.code).then(r=>{
      //console.log(r);
      //this.router.navigate(['home']);
      console.log(r);
      //this.router.navigate([{ outlets: { header: ['login/o'] } }], { skipLocationChange: true });
      //this.router.navigate(['owner/manage-profile']);
      //this.router.navigate([{outlets: {primary: '/home' ,header: '/'}}]);
      this.router.navigate([{outlets:{primary: ['owner/manage-profile'] ,header: ['login/o']}}]);
      //this.router.navigate([{ outlets: { header: ['clear'] } }], { skipLocationChange: true });
    }).catch(e=>console.log(e));
  }

}
