import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/usuarioService/usuario.service';


export const usuarioAutenticadoGuard: CanActivateFn = () => {
  if (inject(UsuarioService).tokenValido())
    return true;
  else {
    inject(ToastrService).warning('Usuário não autenticado. Efetue login.')
    inject(Router).navigate(['/login'])
    return false
  }
};
