import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { profile } from 'src/app/models/profile';

@Component({
  selector: 'app-register-renter',
  templateUrl: './register-renter.component.html',
  styleUrls: ['./register-renter.component.css']
})
export class RegisterRenterComponent implements OnInit {

  constructor(private profileSrv:ProfilesService) { }

  ngOnInit() {
  }

  createRenterProfile(){
    const pro : profile = {
      username:'name',
      email:'email',
      password: 'password',
      status:'AC',
      type:'R'
    }
    this.profileSrv.createNewProfile(pro).then(r=>console.log(r)).then(e=>console.log(e))
  }

}
