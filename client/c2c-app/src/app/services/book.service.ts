import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { book } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  BASEURL = 'http://localhost:3000/api/booking';
  ADDBOOK='/secure/add';
  GETLISTOFBOOKINGFOROWNER='/secure/list/owner/booking';

  addNewBooking(book):Promise<any>{
    console.log(book);
    return this.http.post(this.BASEURL+this.ADDBOOK,book).toPromise();
  }

  getListBookingForOwner():Promise<any>{
    return this.http.get(this.BASEURL+this.GETLISTOFBOOKINGFOROWNER).toPromise();
  }
}
