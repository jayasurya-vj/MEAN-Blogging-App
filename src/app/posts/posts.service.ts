import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {  Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class PostsService{
  domain=environment.apiDomain;
  private posts: Post[]=[];
  private postsUpdated = new Subject<{posts: Post[], postCount:number} >();

  constructor(private http:HttpClient, private router :Router){
    this.posts=[];
  }


  getPostsUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPosts(postsPerPage,currentPage){
    const queryParam=`?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message:string,posts:any,maxPosts:number}>(this.domain+"/api/posts"+queryParam)
    .pipe(map(data=>{
     let posts = data.posts;
      data.posts = posts.map(post => {return {
        title:post.title,
        content: post.content,
        id: post._id,
        // imagePath: post.imagePath,
        creator: post.creator
    }});
    return data;
  }))
    .subscribe(data=>{
      // console.log(data);
      this.posts=data.posts;
      this.posts && this.postsUpdated.next({posts: [...this.posts], postCount:data.maxPosts} );
    });
  }


  getPost(id:string){
    return this.http.get<{message:string,post:any}>(this.domain+"/api/posts/"+id);
  }

  addPost(title:string, content:string){ //, image:File
    // let postData= new FormData();
    // postData.append("title", title);
    // postData.append("content", content);
    // postData.append("image", image,title);
    

    let postData:Post={title:title,content:content};
    console.log(postData);
    this.http.post<{message:string,post:Post}>(this.domain+"/api/posts",postData).subscribe(data=>{
      this.router.navigate(["/"]);
    });
  }

  updatePost(title:string, content:string,postId:string){ //, image:File |string
    let postData;
   /* if(typeof image == "object"){
      postData= new FormData();
      postData.append("_id", postId);
    postData.append("title", title);
    postData.append("content", content);
     postData.append("image", image,title);
    }else{ */
       postData = {_id:postId,title:title,content:content}; //,imagePath:image
    // }
    this.http.put<{message:string}>(this.domain+"/api/posts/"+postId,postData).subscribe(data=>{
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId:string){
    return this.http.delete<{message:string}>(this.domain+"/api/posts/"+postId);
  }
}
