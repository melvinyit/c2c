import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/main/homepage/homepage.component';
import { ListComponent } from './components/main/cars/list.component';
import { IndividualComponent } from './components/main/cars/individual.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { ToolbarComponent } from './components/main/toolbar/toolbar.component';
import { LoginComponent } from './components/main/authentication/login.component';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'',component:FooterComponent, outlet:'footer'},
  {path:'',component:ToolbarComponent, outlet:'header'},
  {path:'home',component:HomepageComponent},
  {path:'list-cars',component:ListComponent},
  {path:'list-car/:id1',component:IndividualComponent},
  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
