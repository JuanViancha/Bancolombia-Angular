import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { BookingComponent } from './booking.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';


@NgModule({
  declarations: [BookingComponent, ReservationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookingRoutingModule
  ],
  exports:[BookingComponent]
})
export class BookingModule { }
