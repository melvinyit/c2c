import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

import { ManageBookingsComponent } from '../components/admin/manage-bookings/manage-bookings.component';
import { ManageCarsComponent } from '../components/admin/manage-cars/manage-cars.component';
import { ManageUsersComponent } from '../components/admin/manage-users/manage-users.component';
import { AdminManageBookingComponent } from '../components/admin/manage-bookings/admin-manage-booking.component';
import { AdminManageCarComponent } from '../components/admin/manage-cars/admin-manage-car.component';
import { AdminManageUserComponent } from '../components/admin/manage-users/admin-manage-user.component';
import { ManageLocationsComponent } from '../components/admin/manage-locations/manage-locations.component';
import { AdminManageLocationComponent } from '../components/admin/manage-locations/admin-manage-location.component';




const ROUTES: Routes = [
  { path: 'manage-bookings', component: ManageBookingsComponent },
  { path: 'manage-cars', component: ManageCarsComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'manage-booking', component: AdminManageBookingComponent },
  { path: 'manage-car', component: AdminManageCarComponent },
  { path: 'manage-user', component: AdminManageUserComponent },
  { path: 'manage-locations', component: ManageLocationsComponent },
  { path: 'manage-location', component: AdminManageLocationComponent }
];

@NgModule({
  declarations: [ManageBookingsComponent,ManageCarsComponent,ManageUsersComponent,AdminManageBookingComponent,
              AdminManageCarComponent,AdminManageUserComponent,ManageLocationsComponent,AdminManageLocationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [ RouterModule ],
  providers: [ ]
})

export class AdminModule { }
