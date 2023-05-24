import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated: boolean = false;
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.setIsAuthenticated(true);
      } else {
        this.setIsAuthenticated(false);
      }
    });
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(response => {
        this.setIsAuthenticated(true);
        setTimeout(() => {
          this.logout(); // cierra sesión después de 5 minutos
        }, 300000);
        return response;
      });
  }

  logout() {
    return signOut(this.auth);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
    this.authState.next(value);
  }

  getAuthState() {
    return this.authState.asObservable();
  }
}