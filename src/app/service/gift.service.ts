import { EventEmitter } from '@angular/core';
import { Gift } from '../models/gift';
import { Category } from '../models/category';
import { Injectable } from '@angular/core';
import { GiftRepository } from '../repository/gift.respository';
import { catchError, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GiftService {
    giftChanged = new EventEmitter<Gift[]>();
    private giftList: Gift[] = [];
    private repository = new GiftRepository();

    getGiftList() {
        return this.giftList.slice(); // traz a copia do array
    }

    addGift(newGift: Gift) {
        this.giftList.push(newGift);
        this.giftChanged.emit(this.giftList.slice());
    }

    getCategories() {
        return this.repository.getAllCategories().pipe(
            tap(value => console.log('Categorias carregadas:', value)),
            catchError(err => {
                console.error('Erro ao buscar categorias:', err);
                return of([] as Category[]);
            })
        );
    }
}