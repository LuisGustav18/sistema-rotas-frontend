import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Rota } from '../model/rota';
import { API_CONFIG } from '../config/api.config';
import { UUIDTypes } from 'uuid';

@Service()
export class RotaService {

    private http = inject(HttpClient);

    public findById(id: UUIDTypes): Observable<Rota> {
        return this.http.get<Rota>(`${API_CONFIG.baseUrl}/rotas/${id}`, {
            withCredentials: true
        })
    }

    public findByIdProjeto(id: UUIDTypes): Observable<Rota[]> {
        return this.http.get<Rota[]>(`${API_CONFIG.baseUrl}/rotas/projeto/imagens/${id}`, {
            withCredentials: true
        })
    }

    public create(rota: Rota): Observable<Rota> {
        return this.http.post<Rota>(`${API_CONFIG.baseUrl}/rotas`, rota, {
            withCredentials: true
        })
    }

    public update(rota: Rota): Observable<Rota> {
        return this.http.put<Rota>(`${API_CONFIG.baseUrl}/rotas/${rota.id}`, rota, {
            withCredentials: true
        })
    }

    public delete(id: UUIDTypes): Observable<Rota> {
        return this.http.delete<Rota>(`${API_CONFIG.baseUrl}/rotas/${id}`, {
            withCredentials: true  
        })
    }
}
