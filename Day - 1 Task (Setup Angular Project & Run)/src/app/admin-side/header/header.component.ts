import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import dateFormat from 'dateformat';
import { AdminloginService } from 'src/app/service/adminlogin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data:any;
  userDetail:any;
  constructor(private service:AdminloginService,public router:Router) {
    setInterval(()=>{
      const now  = new Date();
      this.data = dateFormat(now,"dddd mmmm dS,yyyy, h:MM:ss TT");
    },1);
  }
  ngOnInit(): void {
    this.service.getCurrentUser().subscribe((data:any)=>{

      let userName = this.service.getUserFullName();
      data == null ? (this.userDetail = userName) : (this.userDetail = data.fullName);
    });
  }
  LoggedOut(){
      this.service.LoggedOut();
      this.router.navigate(['/admin']);
  }
}
