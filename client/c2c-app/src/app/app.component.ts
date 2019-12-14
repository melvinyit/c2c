import { Component } from '@angular/core';
import { NewsletterServiceService } from './services/newsletter-service.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'c2c-app';
}
