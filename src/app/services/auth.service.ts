import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {Observable, throwError} from "rxjs";
import {LoginResponse} from "../shared/models/auth/login.response";
import {apiUrl} from "../shared/models/contants/constants";
import {LoginRequest} from "../shared/models/auth/login.request";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = apiUrl;

  constructor(
    private toastrService: ToastrService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

  login(loginRequest: LoginRequest) {
    this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest)
      .subscribe(
        {
          next: loginResponse => {
            this.jwtService.saveToken(loginResponse.access);
            this.jwtService.saveRefreshToken(loginResponse.refresh);
            this.toastrService.success('Logged in successfully');
            this.router.navigate(['dashboard']);
          },
          error: err => {
            this.toastrService.error('Failed to log in');
          }
        }
      )
  }

  logout(): void {
    this.router.navigate(['login'])
    this.jwtService.destroyToken();
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.getToken();
    return token != null;
  }

  refresh(): Observable<LoginResponse> {

    const refreshToken = this.jwtService.getRefreshToken();

    if (!refreshToken) {
      return throwError('No refresh token available');
    }

    const httpHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${refreshToken}`)
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post<LoginResponse>(`${this.baseUrl}/refresh`, {}, {headers: httpHeaders})

  }
}
