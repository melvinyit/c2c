import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { car, carStatus } from 'src/app/models/car';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { book, bookStatusCode, bookDetailsReason } from 'src/app/models/booking';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent implements OnInit {
  //TODO to make date as actual date 

  constructor(private ar:ActivatedRoute,private carSrv:CarService,private bookSrv:BookService,private fb:FormBuilder, private router:Router) { }
  car = null;
  carStatus=carStatus;
  bookDetailsReason=bookDetailsReason;
  reasonlist=[];
  bookingForm:FormGroup=this.fb.group({
    car_id:[''],
    reserved:this.fb.group({
      date_from:['190912',Validators.required],
      date_to:['190927',Validators.required],
      car_id:['']
    }),
    book_details:this.fb.group({
      collection_point_id:[1,Validators.required],
      dropoff_point_id:[1,Validators.required],
      reason:['TR',Validators.required],
      comments:['']
    }),
    drivers:this.fb.array([],Validators.required)
  });
  driverFormArray:FormArray;

  ngOnInit() {
    const carid=this.ar.snapshot.params['carid'];
    console.log('carid',carid);
    for(let e in this.bookDetailsReason) {
      //console.log(e);
      this.reasonlist.push({code:e,value:this.bookDetailsReason[e]});
  }
    //this.reasonlist = this.bookDetailsReason.toString();
    console.log(this.reasonlist);
    this.getCarDetails(carid);
    this.driverFormArray = this.bookingForm.get('drivers') as FormArray;
    this.bookingForm.controls['car_id'].setValue(carid);
  }



  addMoreDriver(){
    const driver = this.fb.group({
      first_name:['firstn',Validators.required],
      last_name:['lastn'],
      license:this.fb.group({
        license_no:['N123456n',Validators.required],
        issuer:['LTA',Validators.required],
        issue_country:['SG',Validators.required],
        exp_in_year:['1',Validators.required]
      })
    });
    this.driverFormArray.push(driver);
  }
  removeDriver(driverindex:number){
    this.driverFormArray.removeAt(driverindex);
  }

  getCarDetails(carid:number) {
    this.carSrv.getCarById(carid).then(r=>{
      console.log('car details')
      //console.log(r);
      this.car=r;
    }).catch(e=>console.log(e));
  }

  bookcar(){
    //console.log('bookcar');
    const booking:book = this.bookingForm.getRawValue();
    /*
    booking.drivers.forEach(driver => {
      //console.log(driver);
      driver.license = {...driver.license};
    });
    */
   //console.log(booking);
    booking.status = bookStatusCode.New;
    booking.reserved.car_id = booking.car_id;
    booking.book_details.drivers_no = this.driverFormArray.length;
    //TODO change it to date, this only can count within a single month
    booking.book_details.total_days_rented = Math.min(+booking.reserved.date_to - +booking.reserved.date_from,30)||1;

    
    this.bookSrv.addNewBooking(booking).then(r=>{
      console.log(r);
      this.router.navigate(['/display/'+r.msg]);
    }).catch(e=>console.log(e));
    
  }

}
