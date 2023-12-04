import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  accounts:any = [];
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
  }
  
}
