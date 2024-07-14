import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-missionskill',
  templateUrl: './missionskill.component.html',
  styleUrls: ['./missionskill.component.css']
})
export class MissionskillComponent implements OnInit {
  missionSkillList:any[]=[];
  deleteSkillmodal:any;
  page:number=1;
  itemsPerPages:number=10;
  searchText:any;
  skillId:any;
  constructor(private service:AdminsideServiceService,private route:Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.GetMissionSkillList();
    this.deleteSkillmodal = new window.bootstrap.Modal(
      document.getElementById('removeMissionSkillModal')
    );
  }
  GetMissionSkillList(){
    this.service.MissionSkillList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionSkillList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err => this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

 
  CloseDeleteSkillModal()
  {
    this.deleteSkillmodal.hide();
  }
  DeleteSkillModal(){
    this.service.DeleteMissionSkill(this.skillId).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
        this.CloseDeleteSkillModal();
        setTimeout(() => {
          this.route.navigate(['admin/missionSkill']);
        }, 1000);
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err => this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
}
