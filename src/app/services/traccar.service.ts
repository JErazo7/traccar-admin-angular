import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

const params = new  HttpParams().set("token", "7jUybUd1IJ62wj8qlRvaicM7O1pOGzNT")

@Injectable({
  providedIn: 'root'
})

export class TraccarService {
    public baseUrl: string;
    public _cookie: string
    
  constructor(private http: HttpClient) { 
    this.baseUrl = "http://demo4.traccar.org"
   }

   async _getCookie(){
     let response: any
    response = await this.http.get<HttpResponse<any>>(this.baseUrl+'/api/session',{params})
    console.log(response)
    
   }
}
