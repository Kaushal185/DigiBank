// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private isLoggedInValue: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    // Check for authentication status on application load
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    // Check if the user was previously authenticated
    this.isLoggedInValue = !!localStorage.getItem('authToken');
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/users?username=${username}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
      map(users => {
        const isValid = users.length > 0;
        if (isValid) {
          // Save authentication token to localStorage
          localStorage.setItem('authToken', 'yourAuthTokenHere');
          this.router.navigate(['/account-details', username]);
          // Update isLoggedInValue based on authentication result
          this.isLoggedInValue = true;
        }
        return isValid;
      })
    );
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInValue;
  }

  // Log out the user
  logout(): void {
    // Remove authentication token from localStorage
    localStorage.removeItem('authToken');
    // Update isLoggedInValue to false
    this.isLoggedInValue = false;
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  // Placeholder for additional logic when needed
  get(): number {
    return 1;
  }
}
