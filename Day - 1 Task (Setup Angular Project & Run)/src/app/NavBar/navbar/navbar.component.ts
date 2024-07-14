import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AdminloginService } from 'src/app/service/adminlogin.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service:AdminloginService,private router:Router) { }
  isLogin:boolean = false;
  userDetail:any;
  loginUserId:any;
  userImage:any;
  userImages:any;
  ngOnInit(): void {
    this.service.getCurrentUser().subscribe((data:any)=>{
      let userName = this.service.getUserDetail();
      if(userName != null || data != null){
        this.isLogin = true;
        data == null ? (this.userDetail = userName.fullName) : (this.userDetail = data.fullName);
        data == null ? (this.loginUserId = userName.userId) : (this.loginUserId = data.userId);
        data == null ? (this.userImage = this.service.imageUrl + '/' + userName.userImage) : (this.userImage = this.service.imageUrl + '/' + data.userImage);
      }
    });
    var tokenDetail = this.service.decodedToken();
    if(tokenDetail.userType != 'user')
    {
      this.isLogin = false;
    }
  }
  RedirectLogin(){
    this.router.navigate(['']);
  }
  RedirectRegister(){
    this.router.navigate(['register']);
  }
  LoggedOut(){
    this.service.LoggedOut();
    this.isLogin = false;
    this.router.navigate(['']);
}
}

