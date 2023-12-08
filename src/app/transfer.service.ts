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

  // transferAmount(fromAccount: string, toAccount: string, amount: number): Observable<any> {
  //   const url = `${this.baseUrl}/accounts`; // Replace with your transfer API endpoint
  //   const transferData = {
  //     fromAccount,
  //     toAccount,
  //     amount
  //   };
  //   return this.http.post<any>(url, transferData);
  // }
  transferAmount2(acc1: any[], acc2: any[], amount: number): Observable<any> {
 
    const url = `${this.baseUrl}/accounts`;
    let fromAccount = acc1[0].accountNumber;
    let toAccount = acc2[0].accountNumber;
    console.log('one');
    // Update account balances and transactions
    let updatedAcc1 = this.updateAccountTransaction1(acc1, amount);
    let updatedAcc2 = this.updateAccountTransaction2(acc2, amount);
    // Make actual API calls to update the server-side data
    let updateData = [updatedAcc1, updatedAcc2];
    return this.http.post<any>(url, updateData);
  }

  private updateAccountTransaction1(accounts: any[], amount: number): any[] {

    accounts[0].balanceAmount -= amount;
    accounts[0].transactions.push({
      fromAccount: accounts[0].accountNumber,
      toAccount: accounts[0].accountNumber,
      amount:amount,
      id: this.newTransactionId()
    });
    return accounts;
  }
  private updateAccountTransaction2(accounts: any[], amount: number): any[] {

    accounts[0].balanceAmount += amount;
    accounts[0].transactions.push({
      fromAccount: accounts[0].accountNumber,
      toAccount: accounts[0].accountNumber,
      amount:amount,
      id: this.newTransactionId()
    });
    return accounts;
  }
  // private updateAccountTransaction2(accounts: any[], amount: number): any[] {
  //   const [fromAccount, toAccount] = accounts;

  //   fromAccount.balanceAmount -= amount;
  //   fromAccount.transactions.push({
  //     fromAccount: fromAccount.accountNumber,
  //     toAccount: toAccount.accountNumber,
  //     amount,
  //     id: this.newTransactionId()
  //   });

  //   toAccount.balanceAmount += amount;
  //   toAccount.transactions.push({
  //     fromAccount: fromAccount.accountNumber,
  //     toAccount: toAccount.accountNumber,
  //     amount,
  //     id: this.newTransactionId()
  //   });

  //   return accounts;
  // }

  private newTransactionId(): number {
    return Date.now();
  }
}
