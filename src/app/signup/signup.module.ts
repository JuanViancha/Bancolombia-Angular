import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { SignupComponent } from './signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';


@NgModule({
  declarations: [SignupComponent, FormRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
