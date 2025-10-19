import { Component } from '@angular/core';
import { GiftService } from '../../../service/gift.service';
import { Gift } from '../../../models/gift';
import { Category } from '../../../models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-gift',
  imports: [],
  templateUrl: './edit-gift.html',
  styleUrl: './edit-gift.css'
})
export class EditGift {

  giftForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    value: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]), // Regex para aceitar apenas números e até duas casas decimaisValidators.required),
    categoryId: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  categoryList: Category[] = [
    new Category('1', 'Eletrônicos'),
    new Category('2', 'Roupas'),
    new Category('3', 'Livros'),
    new Category('4', 'Brinquedos'),
    new Category('5', 'Casa e Cozinha')
  ];

  constructor(private giftService: GiftService) { }

  addGift() {
    if (this.giftForm.valid) {
      const { name, description, value, categoryId, image } = this.giftForm.value;
      const category = this.categoryList.find(cat => cat.id === categoryId) || new Category();
      if (!category) return;

      const newGift = new Gift('', name || '', description || '', value || '', category, image || '');
      this.giftService.addGift(newGift);
      this.giftForm.reset();
    }
  }

  openProfile() { }
  t
  openAbout() { }

  logout() { }

}
