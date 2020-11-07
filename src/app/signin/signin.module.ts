import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';



@NgModule({
  declarations: [SigninComponent, LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SigninRoutingModule
  ]
})
export class SigninModule { }
