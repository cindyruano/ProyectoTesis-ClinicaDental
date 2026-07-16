import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userDataSubject = new BehaviorSubject<any>(this.getUserData());
  public userData$ = this.userDataSubject.asObservable();

  constructor(private router: Router) {}

  private checkAuth(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user_data');
    return !!(token && user);
  }

  private getUserData(): any {
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : null;
  }

  login(email: string, password: string): boolean {
    if (email && password) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        email: email,
        name: email.split('@')[0],
        avatar: 'assets/icon/default-avatar.png'
      };

      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(mockUser));

      this.isAuthenticatedSubject.next(true);
      this.userDataSubject.next(mockUser);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.isAuthenticatedSubject.next(false);
    this.userDataSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): any {
    return this.userDataSubject.value;
  }
}