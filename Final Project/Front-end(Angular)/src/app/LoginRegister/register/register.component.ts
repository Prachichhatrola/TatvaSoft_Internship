import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup,ValidationErrors,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminloginService } from 'src/app/service/adminlogin.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fb:FormBuilder,private service:AdminloginService,private toastr:ToastrService,private router:Router,public toast:NgToastService) { }
  registerForm:FormGroup;
  formValid:boolean;
  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstName:[null,Validators.compose([Validators.required])],
      lastName:[null,Validators.compose([Validators.required])],
      phoneNumber:[null,Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      emailAddress:[null,Validators.compose([Validators.required,Validators.email])],
      password:[null,Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(10)])],
      confirmPassword:[null,Validators.compose([Validators.required])]
    },{validator : [this.passwordCompareValidator],});
  }
  passwordCompareValidator(fc:AbstractControl):ValidationErrors | null{
      return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : {notmatched : true}
  }
  get firstName()
  {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName()
  {
    return this.registerForm.get('lastName') as FormControl;
  }
  get phoneNumber()
  {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get emailAddress()
  {
    return this.registerForm.get('emailAddress') as FormControl;
  }
  get password()
  {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword()
  {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  OnSubmit(){

      this.formValid = true;
      if(this.registerForm.valid)
      {
        let register = this.registerForm.value;
        register.userType = 'user';
        this.service.registerUser(register).subscribe((data:any)=>{
          if(data.result==1)
          {
            //this.toastr.success(data.data);
            this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
            setTimeout(() => {
              this.router.navigate(['admin']);
            }, 1000);
          }
          else
          {
            //this.toastr.error(data.message);
            this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
        })
          this.formValid = false;
      }
  }
}
