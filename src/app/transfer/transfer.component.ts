import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { TransferService } from '../transfer.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  fromAccount: string = '';
  toAccount: string = '';
  amount: number = 0;
  accounts: any[] = [];
  fromAccountsArray: any[] = [];
  username: string = '';

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private transferService:TransferService
  ) {}

  ngOnInit(): void {
    this.accountService.fetchAccounts().subscribe(
      (data: any[]) => {
        this.accounts = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.route.parent?.params.subscribe((params) => {
      this.username = params['username'] || '';
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
    // Validate if fromAccount, toAccount, and amount are valid
    if (!this.fromAccount || !this.toAccount || this.amount <= 0) {
      console.error('Invalid transfer data');
      return;
    }

    // Call the transferAmount method from the AccountService
    this.transferService.transferAmount(
      this.fromAccount,
      this.toAccount,
      this.amount
    ).subscribe(
      (response) => {
        console.log('Transfer successful', response);
        // Handle success, update UI, etc.
      },
      (error) => {
        console.error('Transfer failed', error);
        // Handle error, show error message, etc.
      }
    );
  }
}
