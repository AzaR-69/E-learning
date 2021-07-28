import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EbookComponent } from './ebook/ebook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from 'src/services/search.service';
import { ProfessorService } from 'src/services/professor.service';
import { ProfessorSignupComponent } from './professor-signup/professor-signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfessorRequestsComponent } from './professor-requests/professor-requests.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ProfessorPanelComponent } from './professor-panel/professor-panel.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatRequestsComponent } from './chat-requests/chat-requests.component';
import { ResourceComponent } from './resource/resource.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { HttpInterceptorService } from 'src/services/http-interceptor.service';
import { TokenService } from 'src/services/token.service';
import { AuthService } from 'src/services/auth.service';
import { ChatService } from 'src/services/chat.service';
import { EmailService } from 'src/services/email.service';
import { ResourceService } from 'src/services/resource.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EbookComponent,
    ProfessorSignupComponent,
    LoginComponent,
    DashboardComponent,
    ProfessorRequestsComponent,
    RegisterUserComponent,
    ProfessorPanelComponent,
    ChatBoxComponent,
    ChatRequestsComponent,
    ResourceComponent,
    LandingPageComponent,
    ManageUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SearchService,ProfessorService,TokenService,AuthService,ChatService,EmailService,ResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
