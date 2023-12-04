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
    const url = `${this.baseUrl}?name=${username}`;
    return this.http.get<any[]>(url);
  }
}
