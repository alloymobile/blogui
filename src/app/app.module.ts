import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './public/home-page/home-page.component';
import { AboutPageComponent } from './public/about-page/about-page.component';
import { CodePageComponent } from './public/code-page/code-page.component';
import { ForgetPageComponent } from './public/forget-page/forget-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { PrivacyPageComponent } from './public/privacy-page/privacy-page.component';
import { RegisterPageComponent } from './public/register-page/register-page.component';
import { ResetPageComponent } from './public/reset-page/reset-page.component';
import { TermsPageComponent } from './public/terms-page/terms-page.component';
import { AlloymobileAngularModule } from 'alloymobile-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    CodePageComponent,
    CodePageComponent,
    CodePageComponent,
    ForgetPageComponent,
    LoginPageComponent,
    PrivacyPageComponent,
    RegisterPageComponent,
    ResetPageComponent,
    TermsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AlloymobileAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
