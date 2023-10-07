import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/views/login/service/login.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = JSON.parse(localStorage.getItem('tokenEAgenda')!)

    if (!inject(LoginService).tokenValido()) {
      this.router.navigate(['/login'])
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token.chave}`,
        token: `${token.chave}`
      }
    })

    return next.handle(request);
  }
}
