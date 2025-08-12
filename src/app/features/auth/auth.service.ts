import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  
  // Signals para el estado de autenticación
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _token = signal<string | null>(null);

  // Signals públicos computados
  public readonly currentUser = this._currentUser.asReadonly();
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();
  public readonly token = this._token.asReadonly();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
    
    // Effect para sincronizar el estado de autenticación
    effect(() => {
      const user = this._currentUser();
      const token = this._token();
      
      // Actualizar el estado de autenticación basado en el token
      this._isAuthenticated.set(!!token);
      
      // Log para debugging
      console.log('Auth state changed:', { 
        email: user?.email, 
        isAuthenticated: this._isAuthenticated(), 
        hasToken: !!token 
      });
    });
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          // Actualizar signals
          this._token.set(response.access_token);
          
          // Persistir en localStorage
          localStorage.setItem('access_token', response.access_token);
        })
      );
  }

  logout(): void {
    // Limpiar signals
    this._token.set(null);
    this._currentUser.set(null);
    
    // Limpiar localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  // Métodos de conveniencia que retornan valores actuales
  getCurrentUser(): User | null {
    return this._currentUser();
  }

  getToken(): string | null {
    return this._token();
  }

  // Método para verificar autenticación (mantiene compatibilidad)
  checkAuthStatus(): boolean {
    return this._isAuthenticated();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        this._currentUser.set(user);
        this._token.set(storedToken);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.logout();
      }
    }
  }

  // Método para refrescar el estado desde localStorage
  refreshAuthState(): void {
    this.loadStoredUser();
  }
}
