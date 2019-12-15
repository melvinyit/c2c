import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { bookStatus } from 'src/app/models/booking';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  fullbook = null;
  bookStatus=bookStatus;
  paidFor = false;

  constructor(private bookSrv:BookService,private ar:ActivatedRoute){}

  ngOnInit() {
    const id = this.ar.snapshot.params['bookid'];
    console.log(id);
    this.getBookDetails(id);
  }

  getBookDetails(bookid:number){
    this.bookSrv.getFullBookingForRenter(bookid).then(r=>{
      console.log(r);
      this.fullbook = r;
      this.attachPaypal();
    }).catch(e=>console.log(e));
  };

  generateInvoice(order){
    console.log('generate invoice')
  }

  attachPaypal(){
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: `${this.fullbook.car.maker}-${this.fullbook.car.model}-${this.fullbook.book_details_id}`,
                  amount: {
                    currency_code: 'USD',
                    value: this.fullbook.money.total_rate
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.paypalElement.nativeElement);
  }

}
