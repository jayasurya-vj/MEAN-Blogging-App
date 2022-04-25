import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub:Subscription;
  isLoading=false;
  totalPosts=0;
  postsPerPage=5;
  pageSizeOptions=[1,2,5,10];
  currentPage=1;
  isAuthenticated=false;
  authSub:Subscription;
  userId=null;

  constructor(public postsService: PostsService,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.userId=this.authService.userId;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostsUpdateListener().subscribe( (data : {posts: Post[], postCount:number}) => {
      this.posts=data.posts;
      this.totalPosts=data.postCount;
      this.isLoading=false;
    });
    this.isAuthenticated = this.authService.isAuth;
    this.authSub = this.authService.getAuthListener().subscribe(auth=>{
      this.isAuthenticated=auth;
      this.userId=this.authService.userId;
    })
  }

  ngOnDestroy() : void {
    this.postsSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  deletPost(postId:string){
    this.postsService.deletePost(postId).subscribe(
      ()=>this.postsService.getPosts(this.postsPerPage,this.currentPage),
      ()=>this.isLoading=false);
  }

  onChangeEvent(pageData:PageEvent){
    this.isLoading=true;
    this.postsPerPage=pageData.pageSize;
    this.currentPage=pageData.pageIndex+1;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

}
