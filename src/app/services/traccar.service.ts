import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Device } from '../models/device';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

const auth = 'Basic am9zdWVAZ21haWwuY29tOjEyMzQ1Ng=='

@Injectable({
  providedIn: 'root'
})

export class TraccarService {
    public baseUrl: string
    public _cookie: string
    public getPositions:  WebSocketSubject<Map<String, any>>

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Basic am9zdWVAZ21haWwuY29tOjEyMzQ1Ng=='
      })
    };
    
  constructor(private http: HttpClient) { 
    this.baseUrl = "http://demo4.traccar.org"
    this.getPositions = webSocket('ws://demo4.traccar.org/api/socket')
   }

   public getDevices(): Observable<Device[]>{ 
    return this.http
    .get<Device[]>(this.baseUrl+'/api/devices', {headers: this.httpOptions.headers})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
   }

   public createDevice(device): Observable<Device>{ 
    return this.http
    .post<Device>(this.baseUrl+'/api/devices', JSON.stringify(device), {headers: this.httpOptions.headers})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
   }

   public updateDevice(device): Observable<Device>{ 
    return this.http
    .put<Device>(this.baseUrl+'/api/devices/'+device.id, JSON.stringify(device), {headers: this.httpOptions.headers})
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
   }

   public deleteDevice(id): Observable<Device>{ 
    return this.http
    .delete<Device>(this.baseUrl+'/api/devices/'+id, {headers: this.httpOptions.headers})
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
