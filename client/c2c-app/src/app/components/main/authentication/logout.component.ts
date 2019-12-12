import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  msg = '';
  constructor(private profSrv:ProfilesService) { }

  ngOnInit() {
    if(this.profSrv.logout()){
      this.msg = 'You have been successfully logout';
    }
  }

}
