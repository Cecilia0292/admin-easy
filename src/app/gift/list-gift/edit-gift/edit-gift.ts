import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GiftService } from '../../../service/gift.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-edit-gift',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ IMPORTANTE AQUI
  templateUrl: './edit-gift.html',
  styleUrls: ['./edit-gift.css']
})
export class EditGift implements OnInit {

  giftForm = new FormGroup({
    namePt: new FormControl('', Validators.required),
    nameEn: new FormControl('', Validators.required),
    nameEs: new FormControl('', Validators.required),

    descPt: new FormControl(''),
    descEn: new FormControl(''),
    descEs: new FormControl(''),

    value: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')
    ]),
    categoryId: new FormControl('', Validators.required)
  });

  categoryList: Category[] = [];
  selectedFile: File | null = null;

  constructor(private giftService: GiftService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.giftService.getCategories().subscribe({
      next: (categories) => (this.categoryList = categories),
      error: (err) => console.error('Erro ao carregar categorias:', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  buildGiftRequest() {
    const form = this.giftForm.value;

    // Busca a categoria selecionada
    const selectedCategory = this.categoryList.find(cat => cat.id === form.categoryId);

    if (!selectedCategory) {
      console.warn('Categoria não encontrada!');
      return null; // evita enviar requisição inválida
    }

    // Monta o objeto para o backend
    return {
      categories: [selectedCategory], // 👈 agora vai o objeto completo
      value: form.value,
      translations: {
        pt: { name: form.namePt, description: form.descPt },
        en: { name: form.nameEn, description: form.descEn },
        es: { name: form.nameEs, description: form.descEs }
      }
    };
  }

  addGift() {
    if (this.giftForm.invalid) {
      console.warn('Formulário inválido');
      return;
    }

    const giftRequest = this.buildGiftRequest();
    if (!giftRequest) return; // se a categoria não foi encontrada

    console.log('JSON enviado:', JSON.stringify(giftRequest, null, 2));

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(giftRequest)], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.giftService.saveGift(formData).subscribe({
      next: (response) => {
        console.log('Presente salvo com sucesso!', response);
        this.giftForm.reset();
        this.selectedFile = null;
      },
      error: (err) => console.error('Erro ao salvar presente:', err)
    });
  }

  openProfile() { }
  openAbout() { }
  logout() { }
}
