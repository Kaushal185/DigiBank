// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AuthGuard } from './auth.guard';
import { TransferComponent } from './transfer/transfer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard],children:[] },
  // { path: 'login', component: LoginComponent },
  // { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  // { path: 'account-details/:username', component: AccountDetailsComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }

  {
    path: 'home/:username',
    component: HomeComponent,

    children: [
      { path: 'account-details', component: AccountDetailsComponent },
      { path: 'transfer', component: TransferComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for "Page Not Found"

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
