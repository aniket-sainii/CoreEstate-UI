import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { AuthGuard } from './services/auth.guard';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];