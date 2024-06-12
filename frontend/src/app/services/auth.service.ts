import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MD5} from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/api.php';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string, method: string }): Observable<any> {
    //  credentials.password=MD5(credentials.password).toString();
    console.log(credentials);
    let table_name = 'users';


    
    return this.http.post(`${this.apiUrl}?table=${table_name}`, credentials);
  }


}
