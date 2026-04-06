import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { AuthGuard } from './services/auth.guard';
import { Register } from './pages/register/register';
import { EditProject } from './pages/edit-project/edit-project';
import { Building } from './pages/building/building';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', component: Home, canActivate: [AuthGuard] },
  { path: 'edit-project/:id', component: EditProject, canActivate: [AuthGuard] },
  { path: 'building/:id', component: Building, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];