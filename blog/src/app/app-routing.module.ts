import { AuthService } from './service/auth.service';
import { PostComponent } from './admin/post/post.component';
import { TagComponent } from './admin/tag/tag.component';
import { PostUserComponent } from './admin/post-user/post-user.component';
import { CommentComponent } from './admin/comment/comment.component';
import { ListComponent } from './admin/list/list.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentUserComponent } from './admin/comment-user/comment-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthService],
    children: [
      { path: '', component: ListComponent },
      { path: 'post', component: PostComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'comment', component: CommentComponent },
      { path: 'comment-user', component: CommentUserComponent },
      { path: 'post-user', component: PostUserComponent },
      { path: 'tag', component: TagComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
