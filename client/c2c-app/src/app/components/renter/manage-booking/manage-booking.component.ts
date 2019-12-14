import { Component, OnInit } from '@angular/core';
import { bookStatus } from 'src/app/models/booking';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private bookSrv:BookService) { }

  fb = null;
  bookStatus = bookStatus;

  ngOnInit() {
    const bookid = this.ar.snapshot.params.bookid;
    console.log(bookid);
    this.getBookDetails(bookid);
  }

  getBookDetails(bookid:number){
    this.bookSrv.getFullBookingForRenter(bookid).then(r=>{
      console.log(r);
      this.fb = r;
    }).catch(e=>console.log(e));
  }

  changeBookStatus(newStatus:string){
    console.log(newStatus);
    this.bookSrv.updateBookingStatus(this.fb.book_id,newStatus).then(r=>{
      console.log(r);
      this.getBookDetails(this.fb.book_id);
    }).catch(e=>console.log(e));
  }
}
