import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuarioService/usuario.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = JSON.parse(localStorage.getItem('tokenEAgenda')!)

    if (!inject(UsuarioService).tokenValido()) {

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
