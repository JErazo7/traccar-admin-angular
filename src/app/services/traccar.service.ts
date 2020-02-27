import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Device } from '../models/device';

const auth = 'Basic am9zdWVAZ21haWwuY29tOjEyMzQ1Ng=='

@Injectable({
  providedIn: 'root'
})

export class TraccarService {
    public baseUrl: string;
    public _cookie: string
    
  constructor(private http: HttpClient) { 
    this.baseUrl = "http://demo4.traccar.org"
   }

   public getDevices(): Observable<Device[]>{ 
    return this.http
    .get<Device[]>(this.baseUrl+'/api/devices', {headers: {Authorization: auth}})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
   }

   errorHandl(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
