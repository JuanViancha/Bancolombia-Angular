import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IBooking } from 'src/app/shared/models/booking.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private urlAPI: string = environment.urlBooking;

  constructor(private httpClient: HttpClient) { }

  private handlerError(error: HttpErrorResponse){
    console.error('http error', error);    
    return throwError(`Error calling api ${error.message}`);
  }

  public postCreateBooking(IBooking: IBooking): Observable<IBooking>{
    
    const url = `${this.urlAPI}/booking`;
    return this.httpClient.post<IBooking>(url, IBooking).pipe(
      retry(2), catchError(this.handlerError)
    );
  }
}

