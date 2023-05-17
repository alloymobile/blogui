import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './public/home-page/home-page.component';
import { AboutPageComponent } from './public/about-page/about-page.component';
import { TermsPageComponent } from './public/terms-page/terms-page.component';
import { PrivacyPageComponent } from './public/privacy-page/privacy-page.component';
import { BlogPageComponent } from './public/blog-page/blog-page.component';
import { ContactPageComponent } from './public/contact-page/contact-page.component';
import { BlogDetailsPageComponent } from './public/blog-page/blog-details-page/blog-details-page.component';
import { LoginPageComponent } from './public/login-page/login-page.component';
import { CodePageComponent } from './public/code-page/code-page.component';
import { RegisterPageComponent } from './public/register-page/register-page.component';
import { ForgetPageComponent } from './public/forget-page/forget-page.component';
import { ResetPageComponent } from './public/reset-page/reset-page.component';

const routes: Routes = [
  {path: "",component: HomePageComponent},
  {path: "about",component: AboutPageComponent},
  {path: "contact",component: ContactPageComponent},
  {path: "terms",component: TermsPageComponent},
  {path: "privacy",component: PrivacyPageComponent},
  {path: "blog",component: BlogPageComponent},
  {path: "blog/:id",component: BlogDetailsPageComponent},
  {path: ":category/blog",component: BlogPageComponent},
  {path: ":category/blog/:id",component: BlogDetailsPageComponent},
  {path: "login",component: LoginPageComponent},
  {path: "code",component: CodePageComponent},
  {path: "register",component: RegisterPageComponent},
  {path: "forget",component: ForgetPageComponent},
  {path: "reset",component: ResetPageComponent},
  { path: "",component: HomePageComponent},
  { path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
