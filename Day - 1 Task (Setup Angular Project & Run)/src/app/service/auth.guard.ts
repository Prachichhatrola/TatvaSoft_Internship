import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminloginService } from './adminlogin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service:AdminloginService,public router:Router,public toastr:NgToastService){}
  canActivate(): boolean{
      if(this.service.isLoggedIn())
      {
        return true;
      }
      else
      {
        this.toastr.error({detail:"ERROR",summary:'Invalid Client Request',duration:3000});
        this.router.navigate(['admin']);
        return false;
      }
  }

}
