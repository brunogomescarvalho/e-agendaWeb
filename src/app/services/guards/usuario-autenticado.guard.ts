import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuarioService/usuario.service';


export const usuarioAutenticadoGuard: CanActivateFn = () => {
  const usuarioService = inject(UsuarioService)
  if (usuarioService.tokenValido())
    return true;
  else {

    inject(ToastrService).warning('Usuário não autenticado. Efetue login.')
    usuarioService.logoutUsuario()
    inject(Router).navigate(['/login'])
    return false
  }
};
