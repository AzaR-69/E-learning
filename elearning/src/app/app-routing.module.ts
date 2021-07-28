import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ChatRequestsComponent } from './chat-requests/chat-requests.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EbookComponent } from './ebook/ebook.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ProfessorPanelComponent } from './professor-panel/professor-panel.component';
import { ProfessorRequestsComponent } from './professor-requests/professor-requests.component';
import { ProfessorSignupComponent } from './professor-signup/professor-signup.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResourceComponent } from './resource/resource.component';

const routes: Route[] = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'navbar',component:HomeComponent},
  {path:'manage',component:ManageUsersComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'home',component:LandingPageComponent},
  {path:'ebooks',component:EbookComponent},
  {path:'connect',component:ProfessorPanelComponent},
  {path:'resources',component:ResourceComponent},
  {path:'requests',component:ChatRequestsComponent},
  {path:'registerProfessor',component:ProfessorSignupComponent},
  {path:'registerUser',component:RegisterUserComponent},
  {path:'professorRequest',component:ProfessorRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
