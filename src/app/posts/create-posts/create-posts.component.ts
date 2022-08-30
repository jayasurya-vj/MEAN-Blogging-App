import { Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute,ParamMap} from "@angular/router";
import { FormGroup, Validators, FormControl , AsyncValidator } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import {mimeType} from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})
export class CreatePostsComponent implements OnInit,OnDestroy {
  private mode:string="create";
  private postId:string;
  post:Post;
  isLoading=false;
  imagePreview=null;
  form: FormGroup;
  authSub:Subscription;
  
  constructor(public postsService: PostsService,
    public route:ActivatedRoute,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.authSub=this.authService.getAuthListener().subscribe(isAuth => this.isLoading=false);
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      if(paramMap.has("postId")){
        this.mode="edit";
        this.postId=paramMap.get("postId");
        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(data=>{
          this.isLoading=false;
          // console.log(data.post);
          this.post= {
            id:data.post._id,
            title:data.post.title,
            content:data.post.content
            // ,
            // imagePath:data.post.imagePath
          }
          this.form.setValue({
            title:data.post.title,
            content:data.post.content,
            // image:data.post.imagePath
          })
          //  this.imagePreview=data.post.imagePath;
        });

      }else{
        this.mode="create";
        this.postId=null;
      }

    });

  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    }
    

  initializeForm(){
    this.form = new FormGroup({
      'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(3)]}),
      'content': new FormControl(null,{validators:[Validators.required]}),
      // 'image': new FormControl(null,{validators:[Validators.required],
      // asyncValidators: [mimeType]})
    })
  }

  // onImagePicked(event:Event){
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({image:file});
  //   this.form.get('image').updateValueAndValidity();
  //   const reader=new FileReader();
  //   reader.onload =  ()=> {
  //     this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(file);

  // }

  onSavePost(){
    if(this.form.invalid) {
      return;
    }
    this.isLoading=true;
    if(this.mode=="create"){
       this.postsService.addPost(this.form.value.title,this.form.value.content); //,this.form.value.image
    }else{
      this.postsService.updatePost(this.form.value.title,this.form.value.content,this.post.id); //,this.form.value.image
    }

    this.form.reset();
  }

}
