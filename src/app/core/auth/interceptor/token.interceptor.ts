import { HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../services/localStorage.service";
import { UsuarioService } from "../services/usuario.service";


export const interceptorToken =(request: HttpRequest<unknown>, next: HttpHandlerFn)=>{
  const token = inject(LocalStorageService).obterUsuarioLogado().chave

  if (!inject(UsuarioService).tokenValido()) {

   inject(Router).navigate(['/login'])

    return next(request);
  }

  request = request.clone({

    setHeaders: {
      Authorization: `Bearer ${token}`,
      token: `${token}`
    }
  })

  return next(request);
}

