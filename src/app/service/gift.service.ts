import { EventEmitter } from '@angular/core';
import { Gift } from '../models/gift';
import { Category } from '../models/category';
import { Injectable } from '@angular/core';
import { GiftRepository } from '../repository/gift.respository';
import { catchError, of, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  giftChanged = new EventEmitter<Gift[]>();
  private giftList: Gift[] = [];

  constructor(private readonly repo: GiftRepository) { }

  // retorna a cópia do array atual
  getGiftList(): Gift[] {
    return this.giftList.slice();
  }

  // carrega todos os presentes do backend
  loadGifts(): void {
    this.repo.getAllGifts().subscribe({
      next: (gifts: Gift[]) => {
        this.giftList = gifts;
        this.giftChanged.emit(this.giftList.slice());
      },
      error: (err) => console.error('Erro ao carregar presentes:', err)
    });
  }

  // salva um presente e atualiza a lista
  saveGift(formData: FormData): void {
    this.repo.saveGift(formData).subscribe({
      next: (gifts: Gift[]) => {
        this.giftList = gifts; // backend já retorna a lista completa
        this.giftChanged.emit(this.giftList.slice());
      },
      error: (err) => console.error('Erro ao salvar presente:', err)
    });
  }

  getCategories() {
    return this.repo.getAllCategories().pipe(
      tap(value => console.log('Categorias carregadas:', value)),
      catchError(err => {
        console.error('Erro ao buscar categorias:', err);
        return of([] as Category[]);
      })
    );
  }
}
