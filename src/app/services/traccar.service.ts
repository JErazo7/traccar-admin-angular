import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

   public getCookie(): Observable<string>{
     
    return this.http.get(this.baseUrl+'/api/devices', {observe: 'response', headers: {Authorization: auth}})
    .pipe(
      map(response => {
        return JSON.stringify(response);
      })
    );
   }
}
