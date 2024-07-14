import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminloginService } from 'src/app/service/adminlogin.service';
import { ClientService } from 'src/app/service/client.service';
import { CommonService } from 'src/app/service/common.service';
import { DatePipe } from '@angular/common';
import dateFormat from 'dateformat';
import { Mission } from 'src/app/model/cms.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var window:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  missionList:any[]=[];
  userList:any[]=[];
  page:number=1;
  missionPerPages :number = 9;
  listmissionPerPages:number = 5;
  totalMission:any;
  searchParam:any;
  loginUserId:number=0;
  loginUserName:any;
  loginemailAddress:any;
  missionApplyModal:any;
  shareOrInviteModal:any;
  missionData:any;
  appliedDate:any;
  missionStatu:boolean = false;
  favImag:string='assets/Img/heart1.png';
  favImag1:string='assets/Img/heart11.png';
  view:'grid' | 'list' = 'grid';
  missionFavourite:boolean = false;
  public form: FormGroup;
  rating3:any;
  missionid:any;
  constructor(private service:ClientService,private toast:NgToastService,private router:Router,public commonservice:CommonService,private adminservice:AdminloginService,
    public datepipe: DatePipe,private fb: FormBuilder) {

      // this.form = this.fb.group({
      //   rating: [''],
      // })
    }
  ngOnInit(): void {
    this.adminservice.getCurrentUser().subscribe((data:any)=>{

      let loginUserDetail = this.adminservice.getUserDetail();
      data == null ? (this.loginUserId = loginUserDetail.userId) : (this.loginUserId = data.userId);
      data == null ? (this.loginUserName = loginUserDetail.fullName) : (this.loginUserName = data.fullName);
      data == null ? (this.loginemailAddress = loginUserDetail.emailAddress) : (this.loginemailAddress = data.emailAddress);
    });
    this.AllMissionList();
    this.commonservice.searchList.subscribe((data:any)=>{
        this.searchParam = data;
    });
    this.missionData="";
  }
  OnChangeGrid(){
    this.view = 'grid';
  }
  OnChangeList(){
    this.view = 'list';
  }
  AllMissionList(){
    this.service.MissionList(this.loginUserId).subscribe((data:any) => {
      if(data.result == 1)
      {
        this.missionList = data.data;
        this.missionList = this.missionList.map(x=> {
          var missionimg=x.missionImages ? this.service.imageUrl + '/' + x.missionImages : 'assets/NoImg.png';
          this.rating3 =  x.rating;
          return {
            id:x.id,
            missionTitle:x.missionTitle,
            missionDescription:x.missionDescription,
            countryId:x.countryId,
            countryName:x.countryName,
            cityId:x.cityId,
            cityName:x.cityName,
            startDate:x.startDate,
            endDate:x.endDate,
            totalSheets:x.totalSheets,
            registrationDeadLine:x.registrationDeadLine,
            missionThemeId:x.missionThemeId,
            missionSkillId:x.missionSkillId,
            missionImages:missionimg.split(',',1),
            missionThemeName:x.missionThemeName,
            missionSkillName:x.missionSkillName,
            missionStatus:x.missionStatus,
            missionApplyStatus:x.missionApplyStatus,
            missionApproveStatus:x.missionApproveStatus,
            missionDateStatus:x.missionDateStatus,
            missionDeadLineStatus:x.missionDeadLineStatus,
          }
        });
        this.totalMission = data.data.length;
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        // this.toastr.error(data.message);
      }
  });
  }

  SortingData(e: any) {
    let selectedValue = e.target.value;
    if (selectedValue == 'a-z') {
      this.missionList.sort(function (a, b) {
        var a = a['missionTitle'].toLowerCase(),
            b = b['missionTitle'].toLowerCase();
        return a > b ? 1 : a < b ? -1 : 0;
      });
    }
    else {
      this.missionList.sort(function (a, b) {
        var a = a['missionTitle'].toLowerCase(),
            b = b['missionTitle'].toLowerCase();
        return a < b ? 1 : a > b ? -1 : 0;
      });
    }
  }
  SortingList(e:any)
  {
    let selectedVal = e.target.value;
    selectedVal = selectedVal == '' ? 'null' : selectedVal;
    let value = {
      userId:this.loginUserId,
      sortestValue:selectedVal
    }
    this.service.MissionClientList(value).subscribe((data:any) => {
      if(data.result == 1)
      {
        this.missionList = data.data;
        this.missionList = this.missionList.map(x=> {
          var missionimg=x.missionImages ? this.service.imageUrl + '/' + x.missionImages : 'assets/NoImg.png';
          return {
            id:x.id,
            missionTitle:x.missionTitle,
            missionDescription:x.missionDescription,
            countryId:x.countryId,
            countryName:x.countryName,
            cityId:x.cityId,
            cityName:x.cityName,
            startDate:x.startDate,
            endDate:x.endDate,
            totalSheets:x.totalSheets,
            registrationDeadLine:x.registrationDeadLine,
            missionThemeId:x.missionThemeId,
            missionSkillId:x.missionSkillId,
            missionImages:missionimg.split(',',1),
            missionThemeName:x.missionThemeName,
            missionSkillName:x.missionSkillName,
            missionStatus:x.missionStatus,
            missionApplyStatus:x.missionApplyStatus,
            missionApproveStatus:x.missionApproveStatus,
            missionDateStatus:x.missionDateStatus,
            missionDeadLineStatus:x.missionDeadLineStatus,
          }
        });
        this.totalMission = data.data.length;
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        // this.toastr.error(data.message);
      }
  });
  }
  OpenMissionApplyModal(){
    this.missionApplyModal.show();
  }
  CloseMissionApplyModal(){
    this.missionApplyModal.hide();
  }
  CheckUserLoginOrNot(id:any)
  {
    var tokenDetail = this.adminservice.decodedToken();
    if(tokenDetail == null || tokenDetail.userType != 'user')
    {
        this.router.navigate(['']);
    }
    else
    {
      var data = this.missionList.find((v:Mission)=> v.id == id);
      this.missionData = data;
      const now  = new Date();
      this.appliedDate = dateFormat(now,"dd/mm/yyyy h:MM:ss TT");
      this.ApplyMission()
    }
  }
  RedirectVolunteering(missionId:any)
  {
    var tokenDetail = this.adminservice.decodedToken();
    if(tokenDetail == null || tokenDetail.userType != 'user')
    {
        this.router.navigate(['']);
    }
    else if(tokenDetail.userImage == "")
    {
        this.toast.warning({detail:"Warning",summary:"First Fillup User Profile Detail",duration:3000});
        this.router.navigate([`userProfile/${tokenDetail.userId}`])
    }
    else
    {
      this.router.navigate([`volunteeringMission/${missionId}`]);
    }
  }
  ApplyMission()
  {
    let value={
      missionId:this.missionData.id,
      userId:this.loginUserId,
      appliedDate:moment().format("yyyy-MM-DDTHH:mm:ssZ"),
     status:false,
      sheet:1
    };
      this.service.ApplyMission(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.toast.success({detail:"SUCCESS",summary:data.data});
            setTimeout(() => {
              this.missionData.totalSheets = this.missionData.totalSheets - 1;
            }, 1000);
            window.location.reload();
          }
          else
          {
            this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }

  getUserList(){
    this.service.GetUserList(this.loginUserId).subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.userList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    })
  }
  usercheckedlist:any[]=[];
  GetUserCheckedList(isSelected,item){
      if(isSelected ==true){
        this.usercheckedlist.push({id:item.id,userFullName:item.userFullName,emailAddress:item.emailAddress,
                                    missionShareUserEmailAddress:this.loginemailAddress,baseUrl:document.location.origin,missionId:this.missionid})
      }
      else
      {
        this.usercheckedlist.map((a:any,index:any)=>{
          if(item.id == a.id)
          {
            this.usercheckedlist.splice(index,1)
          }
        })
      }
  }
}
