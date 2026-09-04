import { HttpClient } from '@angular/common/http';
import { Credenciais } from '../model/credenciais';
import { API_CONFIG } from '../config/api.config';
import { Me } from '../model/me';
import { inject, Service } from '@angular/core';
import { map, catchError, of } from 'rxjs';

@Service()
export class AuthService {

    private http = inject(HttpClient);

    authenticate(creds: Credenciais) {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
            withCredentials: true
        })
    }

    isAuthenticated(){
        return this.http.get<Me>(`${API_CONFIG.baseUrl}/auth/me`, {
            withCredentials: true
        }).pipe(
            map(() => true),
            catchError(() => of(false))
        ) 
    }
}