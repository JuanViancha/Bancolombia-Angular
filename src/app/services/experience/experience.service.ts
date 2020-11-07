import { Injectable } from '@angular/core';
import { IExperience } from 'src/app/shared/models/experience.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { IExperienceResponse } from 'src/app/shared/models/experiencesResponse.model';
import { IExperienceTop5Response } from 'src/app/shared/models/top5Response.model';
import { IExperienceDetailResponse } from 'src/app/shared/models/experienceDetailResponse.model';
import {environment} from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {

  private urlAPI: string = environment.urlBase;

  constructor( private httpClient: HttpClient) { }

  private handlerError(error: HttpErrorResponse){
    console.error('http error', error);    
    return throwError(`Error calling api ${error.message}`);
  }

  public getExperiences(): Observable<IExperienceResponse> {
    const url = `${this.urlAPI}/experiences`;
    return this.httpClient.get<IExperienceResponse>(url).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

  public getExperienceById(id: string): any {
    const url = `${this.urlAPI}/experiences/detail/${id}`;
    return this.httpClient.get<IExperienceDetailResponse>(url).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

  public getTop5() :  Observable<IExperienceTop5Response> {
    const url = `${this.urlAPI}/experiences/top5`;
    return this.httpClient.get<IExperienceTop5Response>(url).pipe(
      retry(2), catchError(this.handlerError)
    );
  }
}
