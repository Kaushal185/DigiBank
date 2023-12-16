import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accounts: any[] = [];
  username: string = '';
  chooseCurrency = this.currencyService.getCurrencySymbol('USD');
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private currencyService:CurrencyService,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Get the username from the URL parameter
    this.route.parent?.params.subscribe((params) => {
      //given method have input is (params) from which username is stored.
      this.username = params['username'] || '';
      // Fetch accounts based on the username
      //Here fetchAccountsByUsername return array of type any[]
      //.subscribe method used 
      this.accountService.fetchAccountsByUsername(this.username).subscribe(
        (data: any[]) => {
          // Here input is array of type any received from fetchAccByUser we are storing json into accounts array.
          this.accounts = data;
        },
        (error) => {
          // if array is not there input then this will run.
          console.error('Error fetching data:', error);
        }
      );
    });
  }
  transfer() {
    this.router.navigate(['home',this.username,'transfer']);
  }

}
