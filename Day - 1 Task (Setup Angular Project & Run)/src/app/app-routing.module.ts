import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './LoginRegister/login/login.component';
import { RegisterComponent } from './LoginRegister/register/register.component';
import { ForgotPasswordComponent } from './LoginRegister/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './LoginRegister/reset-password/reset-password.component';
import { HomeComponent } from './NavBar/home/home.component';
import { NewMissionComponent } from './new-mission/new-mission.component';
import { VolunVolunteeringMissionComponent } from './volun-volunteering-mission/volun-volunteering-mission.component';
import { UsereditprofileComponent } from './usereditprofile/usereditprofile.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { VolunteeringTimesheetComponent } from './volunteering-timesheet/volunteering-timesheet.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  // {path:"",component:LoginComponent},
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'addNewMission',component:NewMissionComponent},
  {path:'volunteeringMission/:missionId',component:VolunVolunteeringMissionComponent,canActivate:[AuthGuard]},
  {path:'userProfile/:userId',component:UsereditprofileComponent,canActivate:[AuthGuard]},
  {path:'privacyPolicy',component:PrivacyPolicyComponent},
  {path:'volunteeringTimesheet',component:VolunteeringTimesheetComponent,canActivate:[AuthGuard]},
  {path:'admin',loadChildren:()=>import('./admin-side/admin-side.module').then(mod => mod.AdminSideModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
