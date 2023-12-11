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
  constructor(private transferService: TransferService, private route: ActivatedRoute,private accountService: AccountService) { }
  transactions: any[] = [];
  displayedColumns: string[] = ['from', 'to', 'amount', 'transferType', 'time'];
  dataSource = new MatTableDataSource<any>(this.transactions);
  ngOnInit(): void {

  }
  show(){
    this.route.parent?.params.subscribe((params) => {
      this.username = params['username'] || '';
      console.log(this.username);
      this.accountService.fetchAccountsByUsername(this.username).subscribe(
        (data: any[]) => {
          this.transactions = data;
          console.log(this.transactions);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    });
  }

}
