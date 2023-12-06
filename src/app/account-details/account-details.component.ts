import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accounts: any[] = [];
  username: string = '';

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the username from the URL parameter
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username') || '';
      // Fetch accounts based on the username
      this.accountService.fetchAccountsByUsername(this.username).subscribe(
        (data: any[]) => {
          this.accounts = data;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }
}
