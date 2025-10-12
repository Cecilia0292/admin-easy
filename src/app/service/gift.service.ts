import { EventEmitter } from '@angular/core';
import { Gift } from '../models/gift';
import { Category } from '../models/category';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GiftService {
    giftChanged = new EventEmitter<Gift []>();
    private giftList: Gift  [] = [
        new Gift
        ( 'id',  'Pizza', 'Delicious cheese pizza', '20.00', new Category(  '1',  'Fast Food' ), 'pizza.jpg'),
    ];
    getGiftList() {
        return this.giftList.slice(); // traz a copia do array
    }
    addGift(newGift: Gift   ) {
        this.giftList.push(newGift);
        this.giftChanged.emit(this.giftList.slice());
    }
}