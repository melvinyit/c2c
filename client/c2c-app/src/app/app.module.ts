import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/main/homepage/homepage.component';
import { ToolbarComponent } from './components/main/toolbar/toolbar.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { ContactUsComponent } from './components/main/other/contact-us.component';
import { AboutUsComponent } from './components/main/other/about-us.component';
import { FAQComponent } from './components/main/other/faq.component';
import { TnCComponent } from './components/main/other/tn-c.component';
import { ListComponent } from './components/main/cars/list.component';
import { IndividualComponent } from './components/main/cars/individual.component';
import { RegistrationComponent } from './components/renter/registration.component';
import { BookCarComponent } from './components/renter/book-car/book-car.component';
import { CheckBookingHistoryComponent } from './components/renter/check-booking-history/check-booking-history.component';
import { ManageBookingComponent } from './components/renter/manage-booking/manage-booking.component';
import { AddCarComponent } from './components/owner/add-car/add-car.component';
import { ManageCarComponent } from './components/owner/manage-car/manage-car.component';
import { ListBookingComponent } from './components/owner/list-booking/list-booking.component';
import { ManageProfileComponent } from './components/owner/manage-profile/manage-profile.component';
import { OTPComponent } from './components/owner/otp/otp.component';
import { RegisterOTPComponent } from './components/owner/register-otp/register-otp.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageBookingsComponent } from './components/admin/manage-bookings/manage-bookings.component';
import { ManageCarsComponent } from './components/admin/manage-cars/manage-cars.component';
import { SingleComponent } from './components/admin/manageUsers/single.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ToolbarComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    FAQComponent,
    TnCComponent,
    ListComponent,
    IndividualComponent,
    RegistrationComponent,
    BookCarComponent,
    CheckBookingHistoryComponent,
    ManageBookingComponent,
    AddCarComponent,
    ManageCarComponent,
    ListBookingComponent,
    ManageProfileComponent,
    OTPComponent,
    RegisterOTPComponent,
    ManageUsersComponent,
    ManageBookingsComponent,
    ManageCarsComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
