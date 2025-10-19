import { Injectable } from "@angular/core";
import { AuthRepository } from "../repository/auth.repositoy";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const currentKey = 'currentUser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private repository = new AuthRepository();

    login(email: string, senha: string): Observable<boolean> {
        return this.repository
            .login({ email, password: senha, platform: 'WEB' })
            .pipe(
                map(value => {
                    localStorage.setItem(currentKey, JSON.stringify(value));
                    return true;
                }),
                catchError(err => {
                    console.error('Erro ao realizar login:', err);
                    return of(false);
                })
            );
    }



    isLoggedIn(): boolean {
        return !!localStorage.getItem(currentKey);
    }
}