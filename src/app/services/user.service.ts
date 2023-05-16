import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated: boolean = false;

  constructor(private auth: Auth) { }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(response => {
        this.setIsAuthenticated(true);
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
  }
}