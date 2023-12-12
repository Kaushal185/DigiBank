import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl = 'http://localhost:3000'; // Update with your server URL
  constructor(private http: HttpClient) {}
  getAmount1(fromAccount: string,amount: number): Observable<any> {
    console.log('Amount1');
    const url1 = `${this.baseUrl}/accounts?accountNumber=${fromAccount}`; //
    return this.http.get<any[]>(url1);
  }
  getAmount2(toAccount: string, amount: number): Observable<any> {
    console.log('Amount2');
    const url2 = `${this.baseUrl}/accounts?accountNumber=${toAccount}`//
    return this.http.get<any[]>(url2);
  }

  transferAmount1(acc1: any[], acc2: any[], amount: number): Observable<any> {
    const specificDate = new Date(); // December 8, 2023, 14:30:00
    const accountId = acc2[0].id;
    const url = `${this.baseUrl}/accounts/${accountId}`
    let fromAccount = acc1[0].accountNumber;
    let toAccount = acc2[0].accountNumber;
    acc2[0].balanceAmount += amount;
    acc2[0].transactions.push(
      {
        id:Math.floor(Math.random() * 1000) + 1,
        from:fromAccount,
        to:toAccount,
        Amount:amount,
        transferType:"Credit",
        time:specificDate
      }
    )
    console.log("hasbhi liya karo paji");
    return this.http.put<any>(url, acc2[0]);
  }
  transferAmount2(acc1: any[], acc2: any[], amount: number): Observable<any> {
    const specificDate = new Date(); // December 8, 2023, 14:30:00
    const accountId1 = acc1[0].id;
    const accountId2 = acc2[0].id;
    const url1 = `${this.baseUrl}/accounts/${accountId1}`
    const url2 = `${this.baseUrl}/accounts/${accountId2}`

    let fromAccount = acc1[0].accountNumber;
    let toAccount = acc2[0].accountNumber;
    acc1[0].balanceAmount -= amount;
    acc2[0].balanceAmount += amount;
    acc1[0].transactions.push(
      {
        id:Math.floor(Math.random() * 1000) + 1,
        from:fromAccount,
        to:toAccount,
        Amount:amount,
        transferType: "Debit",
        time:specificDate
      }
    )
    // this.http.put(url2,acc2[0]);
    return this.http.put<any>(url1, acc1[0]);
  }
}
