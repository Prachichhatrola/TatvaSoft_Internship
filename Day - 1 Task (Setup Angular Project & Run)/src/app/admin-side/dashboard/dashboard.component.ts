import { Component, OnInit } from '@angular/core';
import dateFormat,{masks} from 'dateformat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data:any;
  constructor() {
    setInterval(()=>{
      const now  = new Date();
      this.data = dateFormat(now,"dddd mmmm dS,yyyy, h:MM:ss TT");
    },1);
  }

  ngOnInit(): void {

  }

}
