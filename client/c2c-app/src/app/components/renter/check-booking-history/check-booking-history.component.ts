import { Component, OnInit } from '@angular/core';
import { custombooktiny, bookStatus } from 'src/app/models/booking';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-booking-history',
  templateUrl: './check-booking-history.component.html',
  styleUrls: ['./check-booking-history.component.css']
})
export class CheckBookingHistoryComponent implements OnInit {

  constructor(private bookSrv:BookService,private router:Router) { }
  
  booklist:custombooktiny[] = [];
  bookStatus=bookStatus;

  ngOnInit() {
    this.getBookingList();
  }

  getBookingList(){
    this.bookSrv.getListBookingForRenter().then(r=>{
      console.log(r);
      this.booklist = r;
    }).catch(e=>console.log(e));
  }

  gotoManageBook(bookid:number){
    this.router.navigate(['renter/manage-booking/'+bookid]);
  }

}
