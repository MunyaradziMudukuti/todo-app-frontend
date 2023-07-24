import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {AuthService, isAuthenticated} from './auth.service';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {JwtService} from "./jwt.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private authService: AuthService, private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (this.jwtService.getToken() && !request.url.includes('refresh') && !request.url.includes('login')) {
      request = this.addToken(request, this.jwtService.getToken());
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && request.url.includes('refresh') && error.status === 401) {
          this.authService.logout();
          this.toastr.error('Session Expired, Kindly Login');
        }
        if (error instanceof HttpErrorResponse && !request.url.includes('login') && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.jwtService.getRefreshToken();

    if (token) {
      return this.authService.refresh().pipe(
        switchMap((res) => {
          this.jwtService.saveToken(res.access);
          this.jwtService.saveRefreshToken(res.refresh);
          return next.handle(this.addToken(request, res.access));
        }),
        catchError((error) => {
          this.authService.logout();
          this.toastr.error('Session Expired, Kindly Login');
          return throwError(() => error);
        })
      );
    }

    return throwError(() => {
      this.authService.logout();
      this.toastr.error('Session Expired, Kindly Login');
      this.authService.logout()
    });

  }

}
