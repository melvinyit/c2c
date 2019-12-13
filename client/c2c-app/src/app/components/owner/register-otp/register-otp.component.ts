import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-register-otp',
  templateUrl: './register-otp.component.html',
  styleUrls: ['./register-otp.component.css']
})
export class RegisterOTPComponent implements OnInit {

  constructor(private profSrv:ProfilesService) { }

  qrcodeimgsrc = null;

  ngOnInit() {
    this.getOtpQrCode();
  }

  getOtpQrCode(){
    this.profSrv.registerOTPtoken().then(r=>{
      //console.log(r);
      this.qrcodeimgsrc = r.imgSrc;
    }).catch(e=>console.log(e));
  }

}
