import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/services/profiles.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  constructor(private profSrv:ProfilesService) { }

  ngOnInit() {
    this.profSrv.getProfileByToken().then(r=>{
      console.log(r);
    }).catch(e=>console.log(e));
  }

}
