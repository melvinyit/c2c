import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { AddCarComponent } from '../components/owner/add-car/add-car.component';
import { ListBookingComponent } from '../components/owner/list-booking/list-booking.component';
import { ManageBookingComponent } from '../components/owner/manage-booking/manage-booking.component';
import { ManageCarComponent } from '../components/owner/manage-car/manage-car.component';
import { ManageProfileComponent } from '../components/owner/manage-profile/manage-profile.component';
import { OTPComponent } from '../components/owner/otp/otp.component';
import { RegisterOTPComponent } from '../components/owner/register-otp/register-otp.component';
import { ReactiveFormsModule } from '@angular/forms';



const ROUTES: Routes = [
  { path: 'add-car', component: AddCarComponent },
  { path: 'manage-car', component: ManageCarComponent },
  { path: 'list-booking', component: ListBookingComponent },
  { path: 'manage-booking/:bookid', component: ManageBookingComponent },
  { path: 'manage-profile', component: ManageProfileComponent },
  { path: 'auth-otp', component: OTPComponent },
  { path: 'register-otp', component: RegisterOTPComponent }
];

@NgModule({
  declarations: [AddCarComponent,ManageCarComponent,ListBookingComponent,ManageBookingComponent,ManageProfileComponent,OTPComponent,RegisterOTPComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [ RouterModule ],
  providers: [ ]
})
export class OwnerModule { }
