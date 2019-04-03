import { ConversationComponent } from './../components/conversation/conversation.component';
import { SignupComponent } from './../components/sigunp/sigunp.component';
import { VerifyEmailComponent } from './../components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './../components/forgot-password/forgot-password.component';
import { GuardGuard } from './../guards/guard.guard';
import { ProfileComponent } from './../components/profile/profile.component';
import { MessageComponent } from './../components/message/message.component';
import { LandingComponent } from './../components/landing/landing.component';




import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { EmailComponent } from '../components/email/email.component';




const routes: Routes = [
  {
    path: 'email',
    component: EmailComponent
  },
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[GuardGuard]

  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[GuardGuard]
  },
  {
    path:'messages',
    component:MessageComponent,
    canActivate:[GuardGuard]
  },
  {
    path:'verify-email',
    component:VerifyEmailComponent,
    
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent,
    
  },
  {
    path:'signup',
    component:SignupComponent,
  },
  {
    path: 'conversation',
    component: ConversationComponent,
    canActivate: [GuardGuard]
  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }