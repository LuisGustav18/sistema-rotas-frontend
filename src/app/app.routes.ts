import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path:"", redirectTo: 'home', pathMatch: 'full' }, // Rediciona quando o caminho estiver apenas vazio para home
    { path:"", component: HeaderComponent, children: [
        { path:'home', component: HomeComponent }
    ]
    },
    { path: "login", component: LoginComponent}
];
