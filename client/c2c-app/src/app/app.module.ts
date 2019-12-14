import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { LoginComponent } from './components/main/authentication/login.component';
import { RegisterRenterComponent } from './components/main/authentication/register-renter.component';
import { RegisterOwnerComponent } from './components/main/authentication/register-owner.component';
import { RenterModule } from './modules/renter.module';
import { OwnerModule } from './modules/owner.module';
import { AdminModule } from './modules/admin.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { LogoutComponent } from './components/main/authentication/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials.module';
import { RoutingpageComponent } from './components/test/routingpage.component';
import { DisplayComponent } from './components/display/display.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    LoginComponent,
    RegisterRenterComponent,
    RegisterOwnerComponent,
    LogoutComponent,
    RoutingpageComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RenterModule,
    OwnerModule,
    AdminModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
