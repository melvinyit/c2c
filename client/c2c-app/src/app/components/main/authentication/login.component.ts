import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private profSrv:ProfilesService,private router:Router) { }

  loginForm:FormGroup = this.fb.group({
    username:[],
    password:[]
  });

  ngOnInit() {
  }

  authProfile(){
    this.profSrv.authenticateProfile(this.loginForm.value.username,this.loginForm.value.password).then(result=>{
      console.log('find result',result)
      if ('type' in result){
        switch(result.type){
          case 'R':
            console.log('login renter')
            this.router.navigate(['renter/manage-profile']);
            break;
          case 'O':
            console.log('login owner')
            this.router.navigate(['owner/auth-otp']);
            break;
          case 'A':
            console.log('login admin')
            this.router.navigate(['admin/auth-otp']);
            break;
          default:
            console.log('default area')
            this.router.navigate(['home']);
        };
      }else{
        console.log('no type');
      }
    });
    console.log(this.loginForm.value);
    //TODO need to differentiate between the 3 type of user
    
    
  }

}
