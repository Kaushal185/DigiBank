import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  name:string = 'kaushal';
  pass:string = 'oracle';
  isValid1:boolean = false;
  isValid2:boolean = false;
  constructor() { }
   // Assume a simple authentication method for demonstration purposes
   login(username: string, password: string): boolean {
    // Your authentication logic goes here
    // For simplicity, always return true in this example
    if(username == 'kaushal'){
      this.isValid2 = true;
    }
    if(password == 'oracle'){
      this.isValid1 = true;
    }
    return (this.isValid1 && this.isValid2);
  }
}
