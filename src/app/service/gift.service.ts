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

    getGiftList() {
        return this.giftList.slice(); // traz a copia do array
    }

    addGift(newGift: Gift) {
        this.giftList.push(newGift);
        this.giftChanged.emit(this.giftList.slice());
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

    saveGift(formData: FormData): Observable<any> {
        return this.repo.saveGift(formData);
    }
}