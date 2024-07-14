import { Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { read } from '@popperjs/core';
import { ScrollbarWidthService } from '@progress/kendo-angular-common';
import { ActionName, ListBoxComponent, ListBoxToolbarConfig } from '@progress/kendo-angular-listbox';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../Helper/ValidateForm';
import { ChangePassword, ContactUs } from '../model/user.model';
import { AdminloginService } from '../service/adminlogin.service';
import { ClientService } from '../service/client.service';
declare var window:any;
@Component({
  selector: 'app-usereditprofile',
  templateUrl: './usereditprofile.component.html',
  styleUrls: ['./usereditprofile.component.css']
})

export class UsereditprofileComponent implements OnInit {
  changePasswordModal:any;
  addyourSkillModal:any;
  contactUsModal:any;
  loginUserId:any;
  loginDetail:any;
  loginName:any;
  loginUserDetails:any;
  countryList:any[]=[];
  cityList:any[]=[];
  skillList:any[]=[];
  skillList1:any[]=[];
  userSkillList:any[]=[];
  //userSkillList:any;
  isFileUpload = false;
  userImage : any='';
  formData = new FormData();
  userProfileForm:FormGroup;
  userId:any;
  editData:any;
  firstName:any;
  lastName:any;
  contactUsForm:any;
  constructor(public service:ClientService,private loginService:AdminloginService,private router:Router,private toast:NgToastService,public fb:FormBuilder,public activateRouter:ActivatedRoute,public toastr:ToastrService) {
      this.userId = this.activateRouter.snapshot.paramMap.get('userId');
      // if(this.userId != 0)
      // {
      //   this.FetchData(this.userId);
      // }

  }
  public data: string[] = [ 'Anthropology','Archeology','Astronomy','Computer Science','Environmental Science','History','Library Sciences','Mathematics','Music Theory',
  'Research','Administrative Support','Customer Service','Data Entry','Executive Admin','Office Management','Office Reception','Program Management','Transactions','Agronomy',
  'Animal Care / Handling','Animal Therapy','Aquarium Maintenance','Botany','Environmental Education','Environmental Policy','Farming' ];
    public data1: string[] = ['Computer Science','Data Entry','Office Management'];


  public toolbarSettings: ListBoxToolbarConfig = {
    position: 'right',
    tools: ['transferTo', 'transferFrom'],
  };
  ngOnInit(): void {

    this.loginService.getCurrentUser().subscribe((data:any)=>{

      this.loginDetail = this.loginService.getUserDetail();
      data == null ? (this.loginUserId = this.loginDetail.userId) : (this.loginUserId = data.userId);
      data == null ? (this.loginName = this.loginDetail.fullName) : (this.loginName = data.fullName);
      data == null ? (this.firstName = this.loginDetail.firstName) : (this.firstName = data.firstName);
      data == null ? (this.lastName = this.loginDetail.lastName) : (this.lastName = data.lastName);
      data == null ? (this.contactUs.userId = this.loginDetail.userId) : (this.contactUs.userId = data.userId);
      data == null ? (this.contactUs.name = this.loginDetail.fullName) : (this.contactUs.name = data.fullName);
      data == null ? (this.contactUs.emailAddress = this.loginDetail.emailAddress) : (this.contactUs.emailAddress = data.emailAddress);
    });

    this.UserFormCheckValid();
    this.loginUserDetailByUserId(this.loginUserId);

    this.GetUserSkill();
    this.FetchData(this.userId);

    this.CountryList();

    this.changePasswordModal = new window.bootstrap.Modal(
      document.getElementById('changePasswordModal')
    );
    this.addyourSkillModal = new window.bootstrap.Modal(
      document.getElementById('addSkillModal')
    );
    this.contactUsModal = new window.bootstrap.Modal(
      document.getElementById('contactUsModal')
    );
  }
  @ViewChildren(ListBoxComponent)
  private listbox: QueryList<ListBoxComponent>;

  public OnSubmitSkillModal(event: ActionName): void {
    let data = [],
      data1 = [];
    if (this.listbox && this.listbox.length) {
      this.listbox.forEach((item: ListBoxComponent, index: number) => {
        if (index === 0) {
          data = item.data;
        } else {
          data1 = item.data;
        }
      });
      this.skillList1 = data1;
    }
  }
  SaveSkill(){
    let value = {
      skill:this.skillList1.join(','),
      userId:this.loginUserId
    }
    this.service.AddUserSkill(value).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data});
          setTimeout(() => {
            this.CloseAddYourSkillModal();
          }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message});
        }
    },err=>this.toast.error({detail:"ERROR",summary:err.message}));
  }
  GetUserSkill(){
    this.service.GetUserSkill(this.loginUserId).subscribe((data:any)=>{debugger;
      if(data.result == 1)
      {
        if(data.data.length > 0){
          this.userSkillList = data.data;
          this.userSkillList = this.userSkillList[0].text.split(',');
        }
        else
        {
          this.userSkillList = this.data1;
        }
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message});
      }
  },err=>this.toast.error({detail:"ERROR",summary:err.message}));
  }

  CountryList(){
    this.service.CountryList().subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.countryList = data.data;
      }
      else
      {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }
  CityList(countryId:any){
  countryId = countryId.target.value;
  this.service.CityList(countryId).subscribe((data:any)=>{
    if(data.result == 1)
    {
        this.cityList = data.data;
    }
    else
    {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
    }
  });
  }
  loginUserDetailByUserId(id:any){
    this.service.LoginUserDetailById(id).subscribe((data:any)=>{
      if(data.result == 1)
      {
            this.loginUserDetails = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000})
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))

  }
  OnSelectImage(event:any)
  {
    if(event.target.files && event.target.files[0])
    {
      this.formData = new FormData();
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload =(e:any)=>{
          this.userImage = e.target.result;
      }

      for(let i=0;i<event.target.files.length;i++)
      {
          this.formData.append('file',event.target.files[i]);
          this.formData.append('moduleName','UserImage');
      }
      this.isFileUpload = true;
    }
  }
  UserFormCheckValid(){
    this.userProfileForm = this.fb.group({
      id:[0],
      name:[this.firstName,Validators.compose([Validators.required,Validators.maxLength(16)])],
      surname:[this.lastName,Validators.compose([Validators.required,Validators.maxLength(16)])],
      employeeId:[''],
      manager:[''],
      title:['',Validators.compose([Validators.maxLength(255)])],
      department:['',Validators.compose([Validators.maxLength(16)])],
      myProfile:[null,Validators.compose([Validators.required])],
      whyIVolunteer:[''],
      countryId:[null,Validators.compose([Validators.required])],
      cityId:[null,Validators.compose([Validators.required])],
      avilability:[''],
      linkdInUrl:[''],
      mySkills:['',Validators.compose([Validators.required])],
      userImage:['',Validators.compose([Validators.required])],
      userId:['']
    })
  }
  FetchData(id:any)
  {
      this.service.GetUserProfileDetailById(id).subscribe((data:any)=>{
            if(data.result == 1)
            {
              this.editData = data.data;
              if(this.editData != undefined)
              {
                this.userProfileForm = this.fb.group({
                  id:[this.editData.id],
                  name:[this.editData.name,Validators.compose([Validators.required])],
                  surname:[this.editData.surname,Validators.compose([Validators.required])],
                  employeeId:[this.editData.employeeId],
                  manager:[this.editData.manager],
                  title:[this.editData.title],
                  department:[this.editData.department],
                  myProfile:[this.editData.myProfile,Validators.compose([Validators.required])],
                  whyIVolunteer:[this.editData.whyIVolunteer],
                  countryId:[this.editData.countryId,Validators.compose([Validators.required])],
                  cityId:[this.editData.cityId,Validators.compose([Validators.required])],
                  avilability:[this.editData.avilability],
                  linkdInUrl:[this.editData.linkdInUrl],
                  mySkills:[this.editData.mySkills.split(','),Validators.compose([Validators.required])],
                  userImage:[''],
                  userId:[this.editData.userId]
                });
                this.service.CityList(this.editData.countryId).subscribe((data:any)=>{
                  this.cityList = data.data;
                });
                if(this.editData.userImage){
                  this.userImage = this.service.imageUrl + '/' + this.editData.userImage
                }
              }
              // else
              // {
              //   this.userProfileForm = this.fb.group({
              //     name:[this.firstName,Validators.compose([Validators.required])],
              //     surname:[this.lastName,Validators.compose([Validators.required])],
              //     employeeId:[''],
              //     manager:[''],
              //     title:[''],
              //     department:[''],
              //     myProfile:[null,Validators.compose([Validators.required])],
              //     whyIVolunteer:[''],
              //     countryId:[null,Validators.compose([Validators.required])],
              //     cityId:[null,Validators.compose([Validators.required])],
              //     avilability:[''],
              //     linkdInUrl:[''],
              //     mySkills:['',Validators.compose([Validators.required])],
              //     userImage:[null,Validators.compose([Validators.required])],
              //     userId:['']
              //   })
              // }
            }
            else
            {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
            }

      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

  async OnSubmit(){

    let imageUrl = '';
    let formValue = this.userProfileForm.value;
    formValue.userId = this.userId;
    if(this.userProfileForm.valid)
    {
      if(this.isFileUpload)
      {
        await this.service.UploadImage(this.formData).pipe().toPromise().then((res:any)=>{
            if(res.success)
            {
              imageUrl = res.data[0];
            }
        },err=>{this.toast.error({detail:"ERROR",summary:err.message,duration:3000})});
      }
      if(this.isFileUpload)
      {
        formValue.userImage = imageUrl;
      }
      else{
        formValue.userImage = this.editData.userImage;
      }

      var mySkillLists = formValue.mySkills.join(",");
      formValue.mySkills = mySkillLists;
      formValue.status = true;
      this.service.LoginUserProfileUpdate(formValue).subscribe((res:any)=>{
        if(res.result == 1)
        {
            this.toast.success({detail:"SUCCESS",summary:res.data,duration:3000});
            setTimeout(() => {
              this.router.navigate(['home']);
            }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:res.message,duration:3000});
        }
      },err=>{this.toast.error({detail:"ERROR",summary:err.message,duration:3000})});
    }
    else
    {
      ValidateForm.ValidateAllFormFields(this.userProfileForm);
    }
  }
  contactUs:ContactUs = new ContactUs();
  changePass:ChangePassword = new ChangePassword();

  OnSubmitContactUs(form:NgForm){
    form.value.userId = this.contactUs.userId;
    form.value.name = this.contactUs.name;
    form.value.emailAddress = this.contactUs.emailAddress;
      this.service.ContactUs(form.value).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          setTimeout(() => {
            form.value.subject='';
            form.value.message='';
            this.CloseContactUsModal();
          }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err => this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
  passwordCompareValidator(fc:AbstractControl):ValidationErrors | null{
    return fc.get('newPassword')?.value === fc.get('confirmPassword')?.value ? null : {notmatched : true}
  }

  OnSubmitChangePassword(changePasswordForm:NgForm){
    var value = changePasswordForm.value;
    value.userId = this.loginUserId;
    if(changePasswordForm.valid)
    {
          this.loginService.ChangePassword(value).subscribe((data:any)=>{
        if(data.result==1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          setTimeout(() => {
            this.CloseChangePasswordModal();
            this.loginService.LoggedOut();
            this.router.navigate(['']);
          }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
    }

  }
  OnCancel()
  {
    this.router.navigate(['/']);
  }
  OpenChangePasswordModal(){
    this.changePasswordModal.show();
  }
  CloseChangePasswordModal(){
    this.changePasswordModal.hide();
  }
  OpenAddYourSkillModal(){
    this.addyourSkillModal.show();
    this.data1 = this.userSkillList;
  }
  CloseAddYourSkillModal(){
    this.addyourSkillModal.hide();
    window.location.reload();
  }
  OpenContactUsModal(){
    this.contactUsModal.show();
  }
  CloseContactUsModal(){
    this.contactUsModal.hide();
  }
}

