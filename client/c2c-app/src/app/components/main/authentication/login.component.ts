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
    const result = this.profSrv.authenticateProfile(this.loginForm.value.username,this.loginForm.value.password);
    console.log(this.loginForm.value);
    console.log(result);
    //TODO need to differentiate between the 3 type of user
    if (result){
      this.router.navigate['renter/manage-profile'];
    }
  }

}
