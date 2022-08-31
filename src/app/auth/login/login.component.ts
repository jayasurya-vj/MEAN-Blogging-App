import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {AuthService} from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading=false;
  isRedirected=null;
  authSub:Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    public authService:AuthService) { 
      this.activatedRoute.queryParams.subscribe(queryParams => {
        console.log("redirected from=>",queryParams['redirect']);  
        this.isRedirected = queryParams['redirect'];
      });
  }

  

  ngOnInit(): void {
    this.isLoading=false;
    this.authSub= this.authService.getAuthListener().subscribe(isAuth => this.isLoading=false);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    }
  
  onLogin(form:NgForm){
    if(form.invalid) return;
    this.isLoading=true;
    this.authService.loginUser(form.value.email,form.value.password);
  }
}
