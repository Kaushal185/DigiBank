import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  name: string = '';
  pass: string = '';
  wrong: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.name, this.pass).subscribe(
      (response) => {
        //method login return response which passed in .subscribe.
        // Authentication successful, handle the response as needed
        console.log('Login successful', response);
      },
      (error) => {
        // Authentication failed, handle the error
        console.error('Login failed', error);
        this.wrong = 'invalid credentials'
      }
    );
  }
}
