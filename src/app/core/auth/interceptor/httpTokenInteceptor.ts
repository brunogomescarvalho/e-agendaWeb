import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../services/localStorage.service";
import { UsuarioService } from "../services/usuario.service";


export const interceptorToken: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

    if (!inject(UsuarioService).tokenValido()) {

        inject(Router).navigate(['/login'])

        return next(request);
    }

    const token = inject(LocalStorageService).obterUsuarioLogado().chave

    const req = request.clone({

        headers: request.headers.set('Authorization', `Bearer ${token}`),
    })

    return next(req);
}

