import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ProjetoListComponent } from './components/projeto/projeto-list/projeto-list.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { RotaListComponent } from './components/rota/rota-list/rota-list.component';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' }, // Rediciona quando o caminho estiver apenas vazio para home
    {
        path: "", component: HeaderComponent, children: [
            { path: 'home', component: HomeComponent },
        ]
    },
    { path: "login", component: LoginComponent },
    { path: "cadastro", component: CadastroComponent },

    { path: "", component: AppLayoutComponent, children: [
        { path:'projeto', component:ProjetoListComponent },
        { path:'rota', component:RotaListComponent }
    ]}
];
