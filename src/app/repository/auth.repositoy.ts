import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {
    private readonly baseUrl = 'http://localhost:8080';
    private readonly http = inject(HttpClient);

    /**
     * Faz login do usuário
     * @param credentials { email, password }
     */
    login(credentials: { email: string; password: string, platform: String }): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth`, credentials);
    }

    /**
     * Atualiza token de acesso
     * @param token string
     */
    refreshToken(token: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/refresh`, { token });
    }
}
