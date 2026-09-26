import { HttpClient } from '@angular/common/http';
import { inject, Inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { UUIDTypes } from 'uuid';
import { Imagem } from '../model/imagem';
import { API_CONFIG } from '../config/api.config';

@Service()
export class ImagemService {

    private http = inject(HttpClient);

    public findById(id: UUIDTypes): Observable<Imagem> {
        return this.http.get<Imagem>(`${API_CONFIG.baseUrl}/imagens/${id}`, {
            withCredentials: true
        });    
    }

    public findImagemByRota(id: UUIDTypes): Observable<Imagem[]> {
        return this.http.get<Imagem[]>(`${API_CONFIG.baseUrl}/imagens/rota/${id}`, {
            withCredentials: true
        });
    }

    public create(id: UUIDTypes, arquivo: File): Observable<void> {

        const formData = new FormData();

        formData.append('rota', id.toString())
        formData.append('imagem', arquivo);

        return this.http.post<void>(`${API_CONFIG.baseUrl}/imagens`, formData, {
            withCredentials: true
        })
    }

    public delete(id: UUIDTypes): Observable<void> {
        return this.http.delete<void>(`${API_CONFIG.baseUrl}/imagens/${id}`, {
            withCredentials: true
        });
    }
}
