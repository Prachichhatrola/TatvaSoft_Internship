import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminloginService } from 'src/app/service/adminlogin.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public fb:FormBuilder,public service:AdminloginService,public router:Router,public toastr:ToastrService,public toast:NgToastService) { }
  forgotPasswordForm:FormGroup;
  formValid:boolean;
  ngOnInit(): void {
      this.forgotPassword();
  }
  forgotPassword()
  {
    this.forgotPasswordForm = this.fb.group({
      emailAddress : [null,Validators.compose([Validators.required,Validators.email])]
    });
  }
  get emailAddress(){
    return this.forgotPasswordForm.get('emailAddress') as FormControl;
  }

  OnSubmit(){
    this.formValid = true;
      if(this.forgotPasswordForm.valid)
      {
        let addFormValue = this.forgotPasswordForm.value;
        addFormValue.baseUrl = document.location.origin;
          this.service.ForgotPasswordEmailCheck(addFormValue).subscribe((data:any) => {
            if(!data)
            {
                // this.toastr.error('OOPS This email address does not exist');
                this.toast.error({detail:"ERROR",summary:'OOPS This email address does not exist',duration:3000});
            }
            else
            {
              // this.toastr.success('Reset password mail send successfully. please check your emailtoreset your password');
              this.toast.success({detail:"SUCCESS",summary:'Password reset link is send to your registred email, Kindly check your mail box',duration:3000});
              setTimeout(()=>{
                this.router.navigate(['']);
              },2000);
            }
          });
          this.formValid = false;
      }
  }
}
