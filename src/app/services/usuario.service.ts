import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Usuario } from '../model/usuario';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Service()
export class UsuarioService {

    private http = inject(HttpClient);

    create(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${API_CONFIG.baseUrl}/usuarios`, usuario)
    }
}
