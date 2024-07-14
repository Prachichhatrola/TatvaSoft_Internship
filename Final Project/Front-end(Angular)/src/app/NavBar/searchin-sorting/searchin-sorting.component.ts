import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-searchin-sorting',
  templateUrl: './searchin-sorting.component.html',
  styleUrls: ['./searchin-sorting.component.css']
})
export class SearchinSortingComponent implements OnInit {

  constructor(private service:CommonService,private toast:NgToastService) { }
  missionCountryList:any[]=[];
  missionCityList:any[]=[];
  missionThemeList:any[]=[];
  missionSkillList:any[]=[];
  ngOnInit(): void {
    this.GetMissionCountryList();
    this.GetMissionCityList();
    this.GetMissionThemeList();
    this.GetMissionSkillList();
  }

  GetMissionCountryList(){
    this.service.GetMissionCountryList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionCountryList = data.data;
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }
  GetMissionCityList(){
    this.service.GetMissionCityList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionCityList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }
  GetMissionThemeList(){
    this.service.GetMissionThemeList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionThemeList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }
  GetMissionSkillList(){
    this.service.GetMissionSkillList().subscribe((data:any)=>{
        if(data.result == 1){
          this.missionSkillList = data.data;
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
    });
  }
  OnTextChange(text:any)
  {
    this.service.searchList.next(text);
  }
  Onchange(e:any){
    this.service.searchList.next(e.target.value);
  }
}
