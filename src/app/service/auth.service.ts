import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private adminEmail = 'admin@admin.com';
    private adminPassword = 'admin123';
    private currentKey = 'currentUser';

    login(email: string, senha: string): boolean {
        if (email === this.adminEmail && senha === this.adminPassword) {
            localStorage.setItem(this.currentKey, JSON.stringify({ email }));
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.currentKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.currentKey);
    }
}