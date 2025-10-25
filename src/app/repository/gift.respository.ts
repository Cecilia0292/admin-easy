import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class GiftRepository {
  private readonly baseUrl = 'http://localhost:8080';
  private readonly http = inject(HttpClient);
  private readonly currentKey = 'currentUser';

  private getAuthHeaders(): HttpHeaders {
    const stored = localStorage.getItem(this.currentKey);
    if (!stored) {
      console.warn('Nenhum usuário autenticado encontrado.');
      return new HttpHeaders();
    }

    try {
      const user = JSON.parse(stored);
      if (!user.accessToken) {
        console.warn('Token de acesso não encontrado no usuário.');
        return new HttpHeaders();
      }

      return new HttpHeaders({
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/json'
      });
    } catch (err) {
      console.error('Erro ao ler o usuário do localStorage:', err);
      return new HttpHeaders();
    }
  }

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/gift/getAllCategories`)
      .pipe(
        map(categories =>
          categories.map(cat => ({
            ...cat,
            displayName:
              cat.translations?.en.name
          }))
        )
      );
  }

}
