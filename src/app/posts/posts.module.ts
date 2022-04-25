import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import {AngularMaterialModule} from "../angular-material.module";
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CreatePostsComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class PostsModule { }
