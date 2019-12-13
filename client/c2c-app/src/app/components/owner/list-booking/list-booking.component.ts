import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { book, bookStatusCode, bookStatus, custombooktiny } from 'src/app/models/booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  constructor(private bookSrv:BookService,private router:Router) { }
  
  booklist:custombooktiny[] = [];

  ngOnInit() {
    this.getBookingList();
  }

  getBookingList(){
    this.bookSrv.getListBookingForOwner().then(r=>{
      console.log(r);
      
      this.booklist = r;
    }).catch(e=>console.log(e));
  }

  gotoManageBook(bookid:number){
    this.router.navigate(['owner/manage-booking/'+bookid]);
  }

}
