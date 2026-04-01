import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../constants/api.constants';

interface LoginResponse {
  token: string;
}
interface RegisterResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`, { email, password }).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('jwt_token', res.token);
        }
      })
    );
  }
  register(email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}${API_ENDPOINTS.AUTH.REGISTER}`, { email, password }).pipe(
      tap(res => {
        if (res && res.message) {
         
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}