import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AdminloginService } from './adminlogin.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(private service:AdminloginService,public router:Router,public toastr:NgToastService){}
  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedUserType = route.data['expectedUserType'];
    const decodeToken = this.service.decodedToken();
      if(this.service.isLoggedIn() && decodeToken.userType !== expectedUserType)
      {
        this.toastr.error({detail:"ERROR",summary:'You Don`t have admin rights',duration:3000});
        this.router.navigate(['admin']);
        return false;
      }
      else
      {
        return true;
      }
  }

}
