import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookingService } from 'src/app/services/bookings/booking.service';
import { IBooking } from 'src/app/shared/models/booking.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  public formGroup:FormGroup;
  private dataBooking: IBooking;
  @Input() experienceId?: string;
  public confirmacion: string;

  constructor(private formBuilder: FormBuilder, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    this.formGroup = this.formBuilder.group({
      booking_date_start: ['', [Validators.required]],
      booking_date_end: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    }, {
      validators: this.validateDateRange()
    }); 
  }

  private validateDateRange(){
    return(formGroup: FormGroup) => {
      const controlBookingDateStar= formGroup.controls['booking_date_start']
      const controlBookingDateEnd= formGroup.controls['booking_date_end']
      if (new Date(controlBookingDateStar.value) > new Date(controlBookingDateEnd.value)) {
        controlBookingDateEnd.setErrors({ mustGreaterThan: true})
      }
    }

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
    if (errors.dateError) {
      errorMessage += errors.dateError;
    }
    if (errors.mustGreaterThan) {
      errorMessage += ' La fecha final debe ser mayor que la fecha inicial ';
    }
    return errorMessage;

  }

  public reservar():void{
    this.dataBooking = this.formGroup.value;
    this.dataBooking.experience_id = this.experienceId;
    console.log("data", this.dataBooking );
    this.bookingService.postCreateBooking(this.dataBooking).subscribe( response => {
      
      if (response.status == 1) {
        this.confirmacion= 'reserva realizada con exito';
        }
    });
  }
}

