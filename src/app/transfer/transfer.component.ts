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
  accounts: any = [];
  fromAccountsArray: any[] = [];
  username: string = '';
  acc1: any = [];
  acc2: any = [];
  balance: number = 0;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    this.onFromAccountChange();
    this.onToAccountChange();
  }
  onToAccountChange() {
    // Validate if fromAccount, toAccount, and amount are valid
    this.accountService.fetchAccounts().subscribe(
      (data: any[]) => {
        this.accounts = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  onFromAccountChange() {
    this.route.parent?.params.subscribe((params) => {
      this.username = params['username'] || '';
      this.accountService.fetchAccountsByUsername(this.username).subscribe(
        (data: any[]) => {
          this.fromAccountsArray = data;
          console.log(console.log(data[0].balanceAmount));
          this.balance = data[0].balanceAmount;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }
  saveDetails() {

    if (!this.fromAccount || !this.toAccount || this.amount <= 0 || this.amount > 100000 || this.amount > this.balance) {
      console.error('Invalid transfer data');
      return;
    }
    this.transferService.getAmount1(
      this.fromAccount,
      this.amount
    ).subscribe(
      (data: any[]) => {
        this.acc1 = data;
        console.log('Data of account1 is received', this.acc1);

      },
      (error) => {
        console.log('data not received from account1', error);
      }
    );

    this.transferService.getAmount2(
      this.toAccount,
      this.amount
    ).subscribe(
      (data: any[]) => {
        this.acc2 = data;
        console.log('Data of account2 is received', this.acc2);

      },
      (error) => {
        console.log('data not received from account2', error);
      }
    );
  }
  transfer() {

    this.transferService.transferAmount2(this.acc1, this.acc2, this.amount).subscribe(
      (result) => {
        // Handle the result, which contains the updated account information
        console.log('Transfer successful', result);
        this.balance -= this.amount;
      },
      (error) => {
        // Handle errors
        console.error('Transfer failed', error);
      }
    );


  }
}
