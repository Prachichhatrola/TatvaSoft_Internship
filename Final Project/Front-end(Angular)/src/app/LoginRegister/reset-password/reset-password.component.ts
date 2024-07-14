import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminloginService } from 'src/app/service/adminlogin.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit,AfterViewInit {

  constructor(public fb:FormBuilder,public service:AdminloginService,public router:Router,public toastr:ToastrService,public activateRoute:ActivatedRoute,public toast:NgToastService) { }
  resetForm:FormGroup;
  formValid:boolean;
  userId;
  ngOnInit(): void {
    this.resetFormCheck();
  }
  ngAfterViewInit(){
    this.activateRoute.queryParams.subscribe(params =>{
      if(params['Uid'] != null){
        this.userId = params['Uid'];
      }
      else
      {
        this.router.navigate(['forgotPassword']);
        // this.toastr.error('Your Password Reset Link is Expired or Invalid');
      }
    })
  }
  resetFormCheck(){
      this.resetForm = this.fb.group({
        password:[null,Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(10)])],
        confirmPassword:[null,Validators.compose([Validators.required])]
      },{validator : [this.passwordCompareValidator],});
  }
  passwordCompareValidator(fc:AbstractControl):ValidationErrors | null{
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : {notmatched : true}
  }

  get password()
  {
    return this.resetForm.get('password') as FormControl;
  }
  get confirmPassword()
  {
    return this.resetForm.get('confirmPassword') as FormControl;
  }

  OnSubmit(){
      this.formValid = true;
      if(this.resetForm.valid)
      {
        let resetFormValue = this.resetForm.value;
        resetFormValue.Uid = this.userId;
        this.service.ResetPassword(resetFormValue).subscribe((data)=>{
          if(data == "Failure")
          {
            //this.toastr.error('Something went wrong!');
            this.toast.error({detail:"ERROR",summary:'Something went wrong!',duration:3000});
          }
          else
          {
            //this.toastr.success("Password Changed Successfully.");
            this.toast.success({detail:"SUCCESS",summary:"Password Changed Successfully.",duration:3000});
            setTimeout(()=>{
              this.router.navigate(['']);
            },2000);
          }
        });
        this.formValid = false;
      }
  }
}
