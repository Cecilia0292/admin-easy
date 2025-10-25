import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../../service/gift.service';
import { Gift } from '../../../models/gift';
import { Category } from '../../../models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-gift',
  standalone: true,
  templateUrl: './edit-gift.html',
  styleUrls: ['./edit-gift.css']
})
export class EditGift implements OnInit {

  giftForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    value: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')
    ]),
    categoryId: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  categoryList: Category[] = [];

  constructor(private giftService: GiftService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.giftService.getCategories().subscribe({
      next: (categories) => {
        this.categoryList = categories;
      },
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  addGift() {
    if (this.giftForm.invalid) return;

    const { name, description, value, categoryId, image } = this.giftForm.value;
    const category = this.categoryList.find(cat => cat.id === categoryId);

    if (!category) {
      console.warn('Categoria não encontrada.');
      return;
    }

    const newGift: Gift = {
      id: '',
      name: name || '',
      description: description || '',
      value: value || '',
      category,
      image: image || ''
    };

    this.giftService.addGift(newGift);
    this.giftForm.reset();
  }


  openProfile() { }
  openAbout() { }
  logout() { }
}
