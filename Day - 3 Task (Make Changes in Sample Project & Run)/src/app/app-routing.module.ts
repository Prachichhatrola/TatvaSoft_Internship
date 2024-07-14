import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './MyComponent/user/user.component';
import { AboutComponent } from './MyComponent/about/about.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
