import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransferService } from '../transfer.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  username: string = '';
  accounts: any[] = []; // Assuming accounts is the array containing transactions
  displayedColumns: string[] = ['from', 'to', 'amount', 'transferType', 'time'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private transferService: TransferService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.username = params['username'] || '';
      console.log(this.username);
      this.accountService.fetchAccountsByUsername(this.username).subscribe(
        (data: any[]) => {
          this.accounts = data;
          console.log(this.accounts);
          // Combine transactions from all accounts
          const allTransactions: any[] = [];
          this.accounts.forEach(account => {
            if (account.transactions) {
              allTransactions.push(...account.transactions);
            }
          });
  
          // Assign the combined transactions to dataSource.data
          this.dataSource.data = allTransactions;
  
          console.log(allTransactions);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }
  
}

