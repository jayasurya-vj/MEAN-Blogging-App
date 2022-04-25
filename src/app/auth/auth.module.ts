import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AngularMaterialModule} from "../angular-material.module";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule ,
    AngularMaterialModule
  ]
})
export class AuthModule { }
