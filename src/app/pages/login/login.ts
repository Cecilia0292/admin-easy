import { Component } from '@angular/core';
import { Auth } from '../../models/auth';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = new Auth();
  constructor( private authService: AuthService, private router: Router) { }
  onSubmit(form: any) {
    if (form.valid) {
      const sucesso = this.authService.login(this.loginData.email, this.loginData.senha);
      if (sucesso) {
        this.router.navigate(['/gift']); // Ou a rota desejada
      } else {
       this.router.navigate(['/login']); // Ou a rota desejada
      }
    }
  }




}
