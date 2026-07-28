import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path:"", redirectTo: 'home', pathMatch: 'full' }, // Rediciona quando o caminho estiver apenas vazio para home
    { path:'home', component: HomeComponent }
];
