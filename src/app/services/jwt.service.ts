import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {
  }

  getToken(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  destroyToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  destroyRefreshToken(): void {
    localStorage.removeItem('refreshToken');
  }
}
