// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AuthGuard } from './auth.guard';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard],children:[] },
  // { path: 'login', component: LoginComponent },
  // { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  // { path: 'account-details/:username', component: AccountDetailsComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }

  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent},
  { path: 'account-details/:username', component: AccountDetailsComponent},
  { path:'transfer/:username',component:TransferComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
