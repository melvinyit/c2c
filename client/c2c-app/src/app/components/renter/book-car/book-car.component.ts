import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { car } from 'src/app/models/car';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { book, bookStatusCode } from 'src/app/models/booking';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.css']
})
export class BookCarComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private carSrv:CarService,private bookSrv:BookService,private fb:FormBuilder) { }
  car:car = null;
  bookingForm:FormGroup=this.fb.group({
    car_id:[''],
    reserved:this.fb.group({
      date_from:['120918'],
      date_to:['120919'],
      car_id:['']
    }),
    book_details:this.fb.group({
      collection_point_id:['1'],
      dropoff_point_id:['1'],
      reason:['TR'],
      comments:['']
    }),
    drivers:this.fb.array([])
  });
  driverFormArray:FormArray;

  ngOnInit() {
    const carid=this.ar.snapshot.params['carid'];
    console.log('carid',carid);
    this.getCarDetails(carid);
    this.driverFormArray = this.bookingForm.get('drivers') as FormArray;
    this.bookingForm.controls['car_id'].setValue(carid);
  }

  addMoreDriver(){
    const driver = this.fb.group({
      first_name:['firstn'],
      last_name:['lastn'],
      license:this.fb.group({
        license_no:['N123456n'],
        issuer:['LTA'],
        issue_country:['SG'],
        exp_in_year:['1']
      })
    })
    this.driverFormArray.push(driver);
  }

  getCarDetails(carid:number) {
    this.carSrv.getCarById(carid).then(r=>{
      console.log(r);
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
    booking.status = bookStatusCode.New;
    booking.reserved.car_id = booking.car_id;
    this.bookSrv.addNewBooking(booking).then(r=>console.log(r)).catch(e=>console.log(e));
  }

}
