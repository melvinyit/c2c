import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsletterServiceService } from 'src/app/services/newsletter-service.service';

@Component({
  selector: 'app-routingpage',
  templateUrl: './routingpage.component.html',
  styleUrls: ['./routingpage.component.css']
})
export class RoutingpageComponent implements OnInit {
  //constructor( private swPush: SwPush, private nlSrv: NewsletterServiceService) {}
  //constructor () {}
  //not using anymore
  readonly VAPID_PUBLIC_KEY='BDlHHtvlqIbSI_OajHWWM-PdQo6A1dFDR08YcxXgkP2SR6oLr42nDpE-HTqPS_fV-l7OL-L9x2_J7JPEAjtKZ6c';
		
  ngOnInit() {
  }

  constructor(private nlSrv:NewsletterServiceService,private sw:SwPush){}


}
