import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private route:ActivatedRoute){}
  username = '';
  ngOnInit(): void {
    // Get the username from the URL parameter
    this.route?.params.subscribe((params) => {
      //given method have input is (params) from which username is stored.
      this.username = params['username'] || ''
      console.log(this.username);
    });
}
}
