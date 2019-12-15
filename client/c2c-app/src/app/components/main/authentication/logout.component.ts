import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  msg = '';
  constructor(private profSrv:ProfilesService,private router:Router) { }

  ngOnInit() {
    if(this.profSrv.logout()){
      this.msg = 'You have been successfully logout';
      this.router.navigate([{ outlets: { header: ['clear'] } }], { skipLocationChange: true });
    }
  }

}
