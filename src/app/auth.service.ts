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

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/users?username=${username}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
      map(users => {
        const isValid = users.length > 0;
        if (isValid) {
          // Redirect to the home page or any desired route after successful login
          this.router.navigate(['/account-details']);
        }
        return isValid;
      })
    );
  }

  get(): number {
    return 1;
  }
}
