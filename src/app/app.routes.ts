import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ListGift } from './gift/list-gift/list-gift';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/gift', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'gift', component: ListGift, canActivate: [authGuard] },
];
