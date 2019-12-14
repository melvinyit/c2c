import { Component, OnInit } from '@angular/core';
import { NewsletterServiceService } from 'src/app/services/newsletter-service.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  //constructor() { }

  ngOnInit() {
  }

  constructor(private nlSrv:NewsletterServiceService,private sw:SwPush){}
  readonly VAPID_PUBLIC_KEY='BDlHHtvlqIbSI_OajHWWM-PdQo6A1dFDR08YcxXgkP2SR6oLr42nDpE-HTqPS_fV-l7OL-L9x2_J7JPEAjtKZ6c';
	
  subscribeToNotifications() {
    console.log(this.VAPID_PUBLIC_KEY);
      this.sw.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {console.log('trying to sub');
        this.nlSrv.addPushSubscriber(sub).subscribe()})
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

}
