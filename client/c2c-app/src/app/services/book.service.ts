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
  GETLISTOFBOOKINGFORRENTER='/secure/list/renter/booking';
  GETFULLBOOKING='/secure/full/booking/';
  UPDATEBOOKINGSTATUS='/secure/update/booking/status'


  addNewBooking(book):Promise<any>{
    console.log(book);
    return this.http.post(this.BASEURL+this.ADDBOOK,book).toPromise();
  }


  getListBookingForRenter():Promise<any>{
    return this.http.get(this.BASEURL+this.GETLISTOFBOOKINGFORRENTER).toPromise();
  }
  getListBookingForOwner():Promise<any>{
    return this.http.get(this.BASEURL+this.GETLISTOFBOOKINGFOROWNER).toPromise();
  }
  getFullBookingForOwner(bookid:number):Promise<any>{
    return this.http.get(this.BASEURL+this.GETFULLBOOKING+bookid).toPromise();
  }
  getFullBookingForRenter(bookid:number):Promise<any>{
    return this.http.get(this.BASEURL+this.GETFULLBOOKING+bookid).toPromise();
  }
  updateBookingStatus(bookid:number,status:string):Promise<any>{
    const params = {
      book_id:bookid,
      status:status
    }
    return this.http.put(this.BASEURL+this.UPDATEBOOKINGSTATUS,params).toPromise();
  }

}
