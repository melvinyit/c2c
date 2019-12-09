import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookCarComponent } from '../components/renter/book-car/book-car.component';
import { CheckBookingHistoryComponent } from '../components/renter/check-booking-history/check-booking-history.component';
import { ManageProfileComponent } from '../components/renter/manage-profile/manage-profile.component';
import { ManageBookingComponent } from '../components/renter/manage-booking/manage-booking.component';

const ROUTES: Routes = [
  { path: 'book-car/:id', component: BookCarComponent },
  { path: 'check-booking', component: CheckBookingHistoryComponent },
  { path: 'manage-profile', component: ManageProfileComponent },
  { path: 'manage-booking', component: ManageBookingComponent }
];

@NgModule({
  declarations: [BookCarComponent, CheckBookingHistoryComponent,ManageProfileComponent,ManageBookingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [ RouterModule ],
  providers: [ ]
})

export class RenterModule { }
