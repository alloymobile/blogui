import { AuthService } from './service/auth.service';
import { PostUserService } from './admin/post-user/post-user.service';
import { DataService } from './service/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './admin/list/list.component';
import { PostComponent } from './admin/post/post.component';
import { CategoryComponent } from './admin/category/category.component';
import { CommentComponent } from './admin/comment/comment.component';
import { PostUserComponent } from './admin/post-user/post-user.component';
import { TagComponent } from './admin/tag/tag.component';
import { CommentUserComponent } from './admin/comment-user/comment-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    LoginComponent,
    AdminComponent,
    ListComponent,
    PostComponent,
    CategoryComponent,
    CommentComponent,
    PostUserComponent,
    TagComponent,
    CommentUserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [DataService, PostUserService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
