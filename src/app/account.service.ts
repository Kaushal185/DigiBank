import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  fetchAccountsByUsername(username: string): Observable<any[]> {
    // connect base URL with username 
    // so url = http://localhost:3000/accounts?name=kaushal
    const url = `${this.baseUrl}?name=${username}`;
    console.log(url);
    //taking from json from url of given username and convert it into array of type any[].
    return this.http.get<any[]>(url);
  }
  fetchAccounts(): Observable<any[]> {
    // This will directly return base url = 'http://localhost:3000/accounts' means return all json data.
    return this.http.get<any[]>(this.baseUrl);
  }
}


// export class AccountService {
//   private baseUrl = 'http://localhost:3000/accounts';
//   constructor(private http: HttpClient) {}
//   fetchAccounts(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }
//   fetchAccountsByUsername(username: string): Observable<any[]> {
//     const url = `${this.baseUrl}/accounts?name=${username}`;
//     return this.http.get<any[]>(url);
//   }
// }
