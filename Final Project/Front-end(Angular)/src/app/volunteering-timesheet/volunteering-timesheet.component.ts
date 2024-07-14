import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { windowWhen } from 'rxjs';
import ValidateForm from '../Helper/ValidateForm';
import { VolunteeringHours } from '../model/volunteering.model';
import { AdminloginService } from '../service/adminlogin.service';
import { ClientService } from '../service/client.service';
declare var window:any;
@Component({
  selector: 'app-volunteering-timesheet',
  templateUrl: './volunteering-timesheet.component.html',
  styleUrls: ['./volunteering-timesheet.component.css']
})
export class VolunteeringTimesheetComponent implements OnInit {

  constructor(private service:ClientService,private loginService:AdminloginService,private toast:NgToastService,private router:Router,
    private toastr:ToastrService,private fb:FormBuilder,private datePipe:DatePipe) { }
  volunteeringHourseModals:any;
  volunteeringGoalsModals:any;
  deleteModal:any;
  volunteeringHoursForm:FormGroup;
  volunteeringGoalsForm:FormGroup;
  missionList:any;
  hoursList:any;
  goalsList:any;
  editData:any;
  loginDetail:any;
  loginUserId:any;
  hoursId:any;
  ngOnInit(): void {
    this.volunteeringHourseModals = new window.bootstrap.Modal(
        document.getElementById('volunteeringHoursModal')
    );
    this.volunteeringGoalsModals = new window.bootstrap.Modal(
      document.getElementById('volunteeringGoalsModal')
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('removeVolunteeringModal')
    );
    this.VolunteeringHoursFormValidate();
    this.VolunteeringGoalsFormValidate();
    this.loginService.getCurrentUser().subscribe((data:any)=>{

      this.loginDetail = this.loginService.getUserDetail();
      data == null ? (this.loginUserId = this.loginDetail.userId) : (this.loginUserId = data.userId);
    });
    this.GetVolunteeringHoursList();
    this.GetVolunteeringGoalsList();
  }
  OpenVolunteeringHoursModal(){
      this.volunteeringHourseModals.show();
      this.MissionTitleList();
  }
  CloseVolunteeringHoursModal(){
      this.volunteeringHourseModals.hide();
      window.location.reload();
  }
  OpenVolunteeringGoalsModal(){
    this.volunteeringGoalsModals.show();
    this.MissionTitleList();
  }
  CloseVolunteeringGoalsModal(){
    this.volunteeringGoalsModals.hide();
    window.location.reload();
  }
  OpenVolunteeringDeleteModal(id:any){
    this.deleteModal.show();
    this.hoursId = id;
  }
  CloseVolunteeringDeleteModal(){
    this.deleteModal.hide();
  }
  MissionTitleList(){
    this.service.VolunteeringMissionList(this.loginUserId).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

  //*****************************************Volunteering TimeSheet Hours ************************************************** */

  VolunteeringHoursFormValidate(){
    this.volunteeringHoursForm = this.fb.group({
      id:[0],
      missionId:[null,Validators.compose([Validators.required])],
      dateVolunteered:[null,Validators.compose([Validators.required])],
      hours:[null,Validators.compose([Validators.required])],
      minutes:[null,Validators.compose([Validators.required])],
      message:[null,Validators.compose([Validators.required])]
    })
  }
  GetVolunteeringHoursList(){
    this.service.GetVolunteeringHoursList(this.loginUserId).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.hoursList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

  GetVolunteeringHoursById(id:any)
  {
    this.service.GetVolunteeringHoursById(id).subscribe((data:any)=>{
      if(data.result == 1)
      {
            this.editData = data.data;
            let dateformat = this.datePipe.transform(this.editData.dateVolunteered,'yyyy-MM-dd');
            this.editData.dateVolunteered = dateformat;
            this.volunteeringHoursForm.patchValue(this.editData);
            this.OpenVolunteeringHoursModal();
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))

  }
  OnVolunteringHoursSubmit(){
    let value = this.volunteeringHoursForm.value;
    value.userId = this.loginUserId;
      if(value.id == 0 || value.id == null)
      {
        this.InsertVolunteeringHours(value);
      }
      else
      {
        this.UpdateVolunteeringHours(value);
      }
  }
  InsertVolunteeringHours(value:any)
  {
    if(this.volunteeringHoursForm.valid)
      {
          this.service.AddVolunteeringHours(value).subscribe((data:any)=>{
            if(data.result == 1)
            {
              this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
              setTimeout(() => {
                this.volunteeringHoursForm.reset();
                this.CloseVolunteeringHoursModal();
                window.location.reload();
              }, 1000);
            }
            else
            {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
            }
          })
      }
      else{
        ValidateForm.ValidateAllFormFields(this.volunteeringHoursForm);
      }
  }
  UpdateVolunteeringHours(value:any)
  {
    if(this.volunteeringHoursForm.valid)
      {
          this.service.UpdateVolunteeringHours(value).subscribe((data:any)=>{
            if(data.result == 1)
            {
              this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
              setTimeout(() => {
                this.volunteeringHoursForm.reset();
                this.CloseVolunteeringHoursModal();
                window.location.reload();
              }, 1000);
            }
            else
            {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
            }
          })
      }
      else{
        ValidateForm.ValidateAllFormFields(this.volunteeringHoursForm);
      }
  }
  DeleteVolunteeringHours(){
    debugger;
      this.service.DeleteVolunteeringHours(this.hoursId).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          setTimeout(() => {
              this.CloseVolunteeringDeleteModal();
              window.location.reload();
          }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

  //*****************************************Volunteering TimeSheet Goals ************************************************** */
  VolunteeringGoalsFormValidate(){
    this.volunteeringGoalsForm = this.fb.group({
      id:[0],
      missionId:[null,Validators.compose([Validators.required])],
      date:[null,Validators.compose([Validators.required])],
      action:[null,Validators.compose([Validators.required])],
      message:[null,Validators.compose([Validators.required])]
    })
  }

  GetVolunteeringGoalsList(){
    this.service.GetVolunteeringGoalsList(this.loginUserId).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.goalsList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

  GetVolunteeringGoalsById(id:any)
  {
    // var data = this.goalsList.find((v:VolunteeringHours) => v.id == id);
    // let dateformat =  this.datePipe.transform(data.date,"yyyy-MM-dd");
    // data.date = dateformat;
    //   this.volunteeringGoalsForm.patchValue(data);
    //   this.OpenVolunteeringGoalsModal();
    this.service.GetVolunteeringGoalsById(id).subscribe((data:any)=>{
      if(data.result == 1)
      {
            this.editData = data.data;
            let dateformat =  this.datePipe.transform(this.editData.date,"yyyy-MM-dd");
            this.editData.date = dateformat;
            this.volunteeringGoalsForm.patchValue(this.editData);
            this.OpenVolunteeringGoalsModal();
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
  OnVolunteringGoalsSubmit(){
    let value = this.volunteeringGoalsForm.value;
    value.userId = this.loginUserId;
      if(value.id == 0 || value.id == null)
      {
        this.InsertVolunteeringGoals(value);
      }
      else
      {
        this.UpdateVolunteeringGoals(value);
      }
  }
  InsertVolunteeringGoals(value:any)
  {
    if(this.volunteeringGoalsForm.valid)
      {
          this.service.AddVolunteeringGoals(value).subscribe((data:any)=>{
            if(data.result == 1)
            {
              this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
              setTimeout(() => {
                this.volunteeringGoalsForm.reset();
                this.CloseVolunteeringGoalsModal();
                window.location.reload();
              }, 1000);
            }
            else
            {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
            }
          })
      }
      else{
        ValidateForm.ValidateAllFormFields(this.volunteeringGoalsForm);
      }
  }
  UpdateVolunteeringGoals(value:any)
  {
    if(this.volunteeringGoalsForm.valid)
      {
          this.service.UpdateVolunteeringGoals(value).subscribe((data:any)=>{
            if(data.result == 1)
            {
              this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
              setTimeout(() => {
                this.volunteeringGoalsForm.reset();
                this.CloseVolunteeringGoalsModal();
                window.location.reload();
              }, 1000);
            }
            else
            {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
            }
          })
      }
      else{
        ValidateForm.ValidateAllFormFields(this.volunteeringGoalsForm);
      }
  }
  DeleteVolunteeringGoals(){
      this.service.DeleteVolunteeringGoals(this.hoursId).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          setTimeout(() => {
              this.CloseVolunteeringDeleteModal();
              window.location.reload();
          }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

}
