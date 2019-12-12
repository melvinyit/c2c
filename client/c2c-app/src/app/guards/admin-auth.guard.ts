import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProfilesService } from '../services/profiles.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild {
  
  constructor(private router:Router,private ProfSrv:ProfilesService){}

  canActivateChild(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    
      if(this.ProfSrv.checkAdminProfile()){
        console.log('is valid admin profile');
        return true;
      }
      this.router.navigate(['home']);
      return false;

  }
  
}
