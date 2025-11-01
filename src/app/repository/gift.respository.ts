import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class GiftRepository {
  private readonly baseUrl = 'http://localhost:8080';
  private readonly http = inject(HttpClient);
  private readonly currentKey = 'currentUser';

  private getAuthHeaders(contentType: string | null = 'application/json'): HttpHeaders {
    const stored = localStorage.getItem(this.currentKey);
    let headers = new HttpHeaders();

    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.accessToken) {
          headers = headers.set('Authorization', `Bearer ${user.accessToken}`);
        }
      } catch (err) {
        console.error('Erro ao ler o usuário do localStorage:', err);
      }
    }

    if (contentType) {
      headers = headers.set('Content-Type', contentType);
    }

    return headers;
  }

  /** 🗂️ Busca todas as categorias */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/gift/getAllCategories`, {
      headers: this.getAuthHeaders()
    });
  }

  /** 💾 Salva um presente (multipart/form-data) */
  saveGift(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/gift/save`, formData, {
      headers: this.getAuthHeaders(null) // importante: não definir Content-Type manualmente
    });
  }
}

