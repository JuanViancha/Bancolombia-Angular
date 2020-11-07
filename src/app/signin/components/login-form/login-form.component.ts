import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public formGroup:FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['@', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    }); 
  }

  public login():void{
    const data = this.formGroup.value;
    console.log("data", data);
    this.userService.postSingIn(data).subscribe(Response =>{
      console.log('login', Response)
      if (Response.status===1) {
        localStorage.setItem('token',Response.token);
      }  
    });
    this.router.navigateByUrl('/home'); 
  }
}