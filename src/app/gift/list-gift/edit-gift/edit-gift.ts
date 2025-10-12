import { Component, ElementRef, ViewChild } from '@angular/core';
import { GiftService } from '../../../service/gift.service';
import { Gift } from '../../../models/gift';

@Component({
  selector: 'app-edit-gift',
  imports: [],
  templateUrl: './edit-gift.html',
  styleUrl: './edit-gift.css'
})
export class EditGift {


  @ViewChild('nameInput') nameInputRef!: ElementRef;
  @ViewChild('descriptionInput') descriptionInputRef!: ElementRef;
  @ViewChild('valueInput') valueInputRef!: ElementRef;
  @ViewChild('categoryInput') categoryInputRef!: ElementRef;
  @ViewChild('imageInput') imageInputRef!: ElementRef;

  constructor(private giftService: GiftService) { }

  addGift() {
    const giftName = this.nameInputRef.nativeElement.value;
    const giftdescription = this.descriptionInputRef.nativeElement.value;
    const giftvalue = this.valueInputRef.nativeElement.value;
    const giftcategory = this.categoryInputRef.nativeElement.value;
    const giftimage = this.imageInputRef.nativeElement.value;
    const newGift = new Gift(giftName, giftdescription, giftvalue, giftcategory, giftimage);

    this.giftService.addGift(newGift);

  }

}
