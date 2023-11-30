import { Component,Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  name:string = '';
  pass:string = '';
  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string): void {
    this.isLoggedIn = this.authService.login(username, password);
    console.log('inside login function');
    console.log(username);
    console.log(password);
    if (this.isLoggedIn) {
      // Navigate to the dashboard on successful login
      this.router.navigate(['/home']);
    } else {
      // Handle unsuccessful login, e.g., show an error message
    }
  }
  logout(): void {
    // Implement logout logic if needed
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
