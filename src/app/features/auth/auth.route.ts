import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const auth_route: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];
