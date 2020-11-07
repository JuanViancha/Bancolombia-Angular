import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  public formGroup: FormGroup;
  
  
  constructor(private formBuilder: FormBuilder, private userServices: UserService, private router: Router) { }

  ngOnInit(): void {
    this.formInit();

  }

  private formInit(): void {
    this.formGroup =this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['@', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(16), this.validatePassword]]
    });
  }



  private validatePassword( control: AbstractControl) {
    const password= control.value;
    let error = null;
    const er= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!er.test(password)) {
      error = {customError: 'Debes tener al menos una mayuscula y un numero y ser minimo de 8 caracteres'};
    }
    return error;
  }

  public getError(controlName: string): string{
    let error = '';
    const control = this.formGroup.get(controlName);
    if(control.touched && control.errors != null){
      error= this.errorMapping(control.errors)     
    }
    return error;
  }

  private errorMapping(errors:any){
    console.log('errors', errors);
    let errorMessage='';
    if (errors.required) {
      errorMessage += 'Campo obligatorio. ';
    }
    if (errors.customError) {
      errorMessage += errors.customError;
    }
    if (errors.maxlength) {
      errorMessage += `La longitud máxima debe ser ${errors.maxlength.requiredLength} `;
    }
    if (errors.email) {
      errorMessage += ' Debes ingresar un correo valido ';
    }
    return errorMessage;

  }
  
  public register():void{
    const data = this.formGroup.value;
    console.log("data", data);
    let Response: IUser;
    this.userServices.postSingUp(data).subscribe(Response =>{
      console.log('Formulario ', Response); 
      Response=Response;     
    });
    
    if (Response.status == 1) {
      this.router.navigate(['/home']);
      }
  }

}
