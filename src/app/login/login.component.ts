import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  name:string = '';
  pass:string = '';

  onSubmit():void{
    console.log(this.name);
    console.log(this.pass);
  }
}
