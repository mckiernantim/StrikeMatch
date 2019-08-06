import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { ConfirmComponent } from './components/confirm/confirm.component';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
// routing
import { AppRoutingModule } from './routing/routing.module';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
// ui
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { PostService } from './services/post.service';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatCard, MatFormFieldModule, MatSelect, MatSelectModule, MatDialogModule, MatListModule } from "@angular/material"
import {MatButtonModule} from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatMenuModule} from "@angular/material/menu"
import {MatTabsModule} from "@angular/material/tabs"
import {MatTableModule} from "@angular/material/table"

import {MatSortModule} from "@angular/material/sort"
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTabChangeEvent} from "@angular/material/"






// login
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  AuthService,
} from "angular-6-social-login";



// database

import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from './../environments/environment';
// custom components
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/sigunp/sigunp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { MessageComponent } from './components/message/message.component';
import { FeedComponent, TruncatePipe } from './components/feed/feed.component';
import { LocalAuthService } from './services/local-auth.service';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EditComponent } from './components/edit/edit.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ClaimComponent } from './components/claim/claim.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { TermsComponent } from './components/terms/terms.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';





// login Config
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },
          {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
          },
      ]
  );
  return config;
}


@NgModule({
  declarations: [
   
    TruncatePipe,
    AppComponent,
    TermsComponent,
    PostsComponent,
    ModalComponent,
    ProfileComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    DashboardComponent,
    LandingComponent,
    MessageComponent,
    FeedComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    FeedComponent,
    EditComponent,
    ConversationComponent,
    ClaimComponent,
   UserComponent,
    ConfirmComponent,
    ExchangeComponent,
    TermsComponent,
    UserComponent,
    NavbarComponent,
 
  
    
    

  ],
  imports: [
    
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, "StrikeMatch"),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatSortModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,

    ReactiveFormsModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    

   
  
    ],
  entryComponents:[
    ClaimComponent,
    ModalComponent,
    
  

  ],
  providers: [
    
    PostService,
    AuthService,
    LocalAuthService,
 
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
