import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookCarComponent } from '../components/renter/book-car/book-car.component';
import { CheckBookingHistoryComponent } from '../components/renter/check-booking-history/check-booking-history.component';
import { ManageProfileComponent } from '../components/renter/manage-profile/manage-profile.component';
import { ManageBookingComponent } from '../components/renter/manage-booking/manage-booking.component';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  { path: 'book-car/:carid', component: BookCarComponent },
  { path: 'check-booking', component: CheckBookingHistoryComponent },
  { path: 'manage-profile', component: ManageProfileComponent },
  { path: 'manage-booking/:bookid', component: ManageBookingComponent }
];

@NgModule({
  declarations: [BookCarComponent, CheckBookingHistoryComponent,ManageProfileComponent,ManageBookingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [ RouterModule ],
  providers: [ ]
})

export class RenterModule { }
