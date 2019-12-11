import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProfilesService } from '../services/profiles.service';

@Injectable({
  providedIn: 'root'
})
export class RenterAuthGuard implements CanActivateChild {

  constructor(private router:Router,private ProfSrv:ProfilesService){}

  canActivateChild(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    
      if(this.ProfSrv.checkRenterProfile()){
        console.log('is renter profile');
        return true;
      }
      this.router.navigate(['home']);
      return false;

  }
  
}
