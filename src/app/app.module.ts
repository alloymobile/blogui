import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
import { AdminPageComponent } from './private/admin-page/admin-page.component';
import { AdminProfilePageComponent } from './private/admin-page/admin-profile-page/admin-profile-page.component';
import { AdminDashboardPageComponent } from './private/admin-page/admin-dashboard-page/admin-dashboard-page.component';
import { ContactPageComponent } from './public/contact-page/contact-page.component';
import { BlogPageComponent } from './public/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './public/blog-page/blog-details-page/blog-details-page.component';
import { AdminBlogPageComponent } from './private/admin-page/admin-blog-page/admin-blog-page.component';
import { AdminCategoryPageComponent } from './private/admin-page/admin-category-page/admin-category-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    BlogPageComponent,
    BlogDetailsPageComponent,
    ContactPageComponent,
    CodePageComponent,
    ForgetPageComponent,
    LoginPageComponent,
    PrivacyPageComponent,
    RegisterPageComponent,
    ResetPageComponent,
    TermsPageComponent,
    AdminPageComponent,
    AdminDashboardPageComponent,
    AdminProfilePageComponent,
    AdminBlogPageComponent,
    AdminCategoryPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
