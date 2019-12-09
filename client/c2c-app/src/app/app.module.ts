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
import { LoginComponent } from './components/main/authentication/login.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
