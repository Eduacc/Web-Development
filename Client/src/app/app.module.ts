import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from './services/account/account.service';
import {ApiService} from './services/api/api.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './auth-guards/auth.guard';
import {IncognitoGuard} from './auth-guards/incognito.guard';

const appRoutes: Routes = [
  { path: 'login', component: SignInFormComponent, canActivate: [IncognitoGuard] },
  { path: 'register', component: SignUpFormComponent, canActivate: [IncognitoGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: '', redirectTo: '/profile', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/profile', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing : true}
    )
  ],
  providers: [ AccountService, ApiService, AuthService, AuthGuard, IncognitoGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
