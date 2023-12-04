import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
const routes: Routes = [
  {path:"home",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"navbar",component:NavbarComponent},
    {path:"account-detials",component:AccountDetailsComponent},
    {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
