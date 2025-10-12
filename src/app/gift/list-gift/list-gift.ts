import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditGift } from './edit-gift/edit-gift';
import { Gift } from '../../models/gift';
import { Subscription } from 'rxjs';
import { GiftService } from '../../service/gift.service';

@Component({
  selector: 'app-list-gift',
  imports: [EditGift],
  templateUrl: './list-gift.html',
  styleUrl: './list-gift.css'
})
export class ListGift implements OnInit, OnDestroy{

  giftList!: Gift[];
  subscription: Subscription = new Subscription();

  constructor(private giftService: GiftService) { }
  ngOnInit(): void {
    this.giftList = this.giftService.getGiftList();
    this.subscription = this.giftService.giftChanged.subscribe((gift: Gift[]) => {
      this.giftList = gift;
    });
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
