import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search';
import { LoginComponent } from './components/login/login';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
