// transfer.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  fromAccount: string = '';
  toAccount: string = '';
  amount: number = 0;
  accounts: any[] = []; // Assuming accounts is an array
  fromAccountsArray:any[] = [];// Accounts of user who loggedIn
  username: string = '';

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.accountService.fetchAccounts().subscribe(
      (data: any[]) => {
        // Store the fetched data in the accounts array
        this.accounts = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username') || '';
      // Fetch accounts based on the username
      this.accountService.fetchAccountsByUsername(this.username).subscribe(
        (data: any[]) => {
          this.fromAccountsArray = data;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });

  }

  transfer() {
    // Implement your  logic here
    console.log(`Transferring ${this.amount} from ${this.fromAccount} to ${this.toAccount}`);
  }
}
