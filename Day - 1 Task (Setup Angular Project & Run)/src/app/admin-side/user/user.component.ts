import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page: number = 1;
  itemsPerPages: number = 10;
  searchText:any='';
  userList:any[]=[];
  deleteModal:any;
  userId:any;
  constructor(private service:AdminsideServiceService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.FetchUserList();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('removeMissionModal')
    );
  }
  FetchUserList(){
    this.service.UserList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.userList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000}));
  }

  
  CloseRemoveMissionModal(){
    this.deleteModal.hide();
  }
  DeleteUser(){
    this.service.DeleteUser(this.userId).subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          setTimeout(() => {
            this.deleteModal.hide();
          window.location.reload();
          }, 1000);
      }
      else{
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000}))
  }

}
