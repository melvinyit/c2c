import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/main/homepage/homepage.component';
import { ListComponent } from './components/main/cars/list.component';
import { IndividualComponent } from './components/main/cars/individual.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { ToolbarComponent } from './components/main/toolbar/toolbar.component';
import { LoginComponent } from './components/main/authentication/login.component';
import { RegisterRenterComponent } from './components/main/authentication/register-renter.component';
import { RegisterOwnerComponent } from './components/main/authentication/register-owner.component';
import { TnCComponent } from './components/main/other/tn-c.component';
import { FAQComponent } from './components/main/other/faq.component';
import { AboutUsComponent } from './components/main/other/about-us.component';
import { ContactUsComponent } from './components/main/other/contact-us.component';
import { RenterAuthGuard } from './guards/renter-auth.guard';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'',component:FooterComponent, outlet:'footer'},
  {path:'',component:ToolbarComponent, outlet:'header'},
  {path:'home',component:HomepageComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'FAQ',component:FAQComponent},
  {path:'TnC',component:TnCComponent},
  {path:'list-cars',component:ListComponent},
  {path:'list-car/:id1',component:IndividualComponent},
  {path:'login',component:LoginComponent},
  {path:'register/renter',component:RegisterRenterComponent},
  {path:'register/owner',component:RegisterOwnerComponent},
  {path:'renter',
    loadChildren: () => import('./modules/renter.module').then(m => m.RenterModule),
    canActivateChild: [RenterAuthGuard] 
  },
  {path:'owner',
    loadChildren: () => import('./modules/owner.module').then(m => m.OwnerModule),
    //canActivateChild: [ AuthService ]
  },
  {path:'admin',
    loadChildren: () => import('./modules/owner.module').then(m => m.OwnerModule),
    //canActivateChild: [ AuthService ]
  },
  {path:'admin',
    loadChildren: () => import('./modules/admin.module').then(m => m.AdminModule),
    //canActivateChild: [ AuthService ]
  },
  {path:'**',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
