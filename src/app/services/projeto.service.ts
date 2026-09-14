import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Projeto } from '../model/projeto';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UUIDTypes } from 'uuid';

@Service()
export class ProjetoService {

    private http = inject(HttpClient);

    public findById(id: UUIDTypes): Observable<Projeto> {
        return this.http.get<Projeto>(`${API_CONFIG.baseUrl}/projetos/${id}`)
    }

    public findbyUsuario(): Observable<Projeto[]>{
        return this.http.get<Projeto[]>(`${API_CONFIG.baseUrl}/projetos/usuario`, {
            withCredentials: true
        })
    }

    public create(projeto: Projeto): Observable<Projeto> {
        return this.http.post<Projeto>(`${API_CONFIG.baseUrl}/projetos`, projeto, {
            withCredentials: true
        })
    }

    public update(projeto: Projeto): Observable<Projeto> {
        return this.http.put<Projeto>(`${API_CONFIG.baseUrl}/projetos/${projeto.id}`, projeto, {
            withCredentials: true
        })
    }

    public delete(id: UUIDTypes): Observable<Projeto> {
        return this.http.delete<Projeto>(`${API_CONFIG.baseUrl}/projetos/${id}`, {
            withCredentials: true
        })
    }
}
