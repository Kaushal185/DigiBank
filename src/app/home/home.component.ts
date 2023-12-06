import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
