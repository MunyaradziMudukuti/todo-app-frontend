import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {Observable, throwError} from "rxjs";
import {LoginResponse} from "../shared/models/auth/login.response";
import {apiUrl} from "../shared/models/contants/constants";
import {LoginRequest} from "../shared/models/auth/login.request";
import {RefreshResponse} from "../shared/models/auth/refresh.response";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = apiUrl;

  constructor(
    private toastrService: ToastrService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {
  }

  login(loginRequest: LoginRequest) {
    this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest)
      .subscribe(
        {
          next: value => {
            this.jwtService.saveToken(value.token);
            this.toastrService.success('Logged in successfully');
          },
          error: err => {
            this.toastrService.error('Failed to log in');
          }
        }
      )
  }

  logout(): void {
    this.jwtService.destroyToken();
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.getToken();
    return token != null;
  }

  refresh(): Observable<RefreshResponse> {
    const refreshToken = this.jwtService.getRefreshToken();
    if (!refreshToken) {
      return throwError('No refresh token available');
    }
    return this.http.post<RefreshResponse>('/refresh', {refreshToken});
  }
}
