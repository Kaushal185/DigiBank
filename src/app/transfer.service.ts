import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl = 'http://localhost:3000'; // Update with your server URL

  constructor(private http: HttpClient) {}

  transferAmount(fromAccount: string, toAccount: string, amount: number): Observable<any> {
    console.log('Hello');
    const url = `${this.baseUrl}/transfer`; // Replace with your transfer API endpoint
    const transferData = {
      fromAccount,
      toAccount,
      amount
    };
    return this.http.post<any>(url, transferData);
  }
}
