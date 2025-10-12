import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ListGift } from './gift/list-gift/list-gift';



export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: Login}, // <-- Rota principal
    {path: 'gift', component: ListGift},
];
