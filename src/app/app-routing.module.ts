import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostsComponent } from './posts/create-posts/create-posts.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path:"", component: PostListComponent},
  {path:"create", component: CreatePostsComponent, canActivate:[AuthGuard]},
  {path:"edit/:postId", component: CreatePostsComponent, canActivate:[AuthGuard]},
  {path:"user", loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
