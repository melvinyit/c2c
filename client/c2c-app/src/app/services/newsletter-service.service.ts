import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterServiceService {


  constructor(private http: HttpClient) {

  }

  URL = 'http://localhost:3000/subscribe';
  URLSEND = 'http://localhost:3000/send/webpush';

  //URL = '/subscribe';
  //URLSEND = '/send/webpush';

  addPushSubscriber(sub:any) {
      return this.http.post(this.URL, sub);
  }

  send() {
      return this.http.post('/api/newsletter', null);
  }
}
