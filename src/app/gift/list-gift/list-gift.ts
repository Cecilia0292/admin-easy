import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditGift } from './edit-gift/edit-gift';
import { Gift } from '../../models/gift';
import { Subscription } from 'rxjs';
import { GiftService } from '../../service/gift.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-gift',
  imports: [
    CommonModule, // necessário para *ngFor e *ngIf
    EditGift
  ],
  templateUrl: './list-gift.html',
  styleUrls: ['./list-gift.css']
})
export class ListGift implements OnInit, OnDestroy {

  giftList!: Gift[];
  subscription: Subscription = new Subscription();

  constructor(private giftService: GiftService) { }
  ngOnInit(): void {
    // Inscreve no evento de atualização da lista
    this.subscription = this.giftService.giftChanged.subscribe((gift: Gift[]) => {
      this.giftList = gift;
    });

    // Carrega todos os presentes do backend
    this.giftService.loadGifts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
