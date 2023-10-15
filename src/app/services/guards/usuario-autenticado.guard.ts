import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuarioService/usuario.service';

export const usuarioAutenticadoGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const usuarioService = inject(UsuarioService);

  if (route.data['authRequired'] && !usuarioService.tokenValido()) {

    inject(ToastrService).warning('Usuário não autenticado. Efetue login.');

    usuarioService.logoutUsuario();

    inject(Router).navigate(['/login']);

    return false;
  }

  return true;
};