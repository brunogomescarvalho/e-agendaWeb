import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/views/login/service/login.service';

export const usuarioAutenticadoGuard: CanActivateFn = () => {
  if (inject(LoginService).tokenValido())
    return true;
  else {
    inject(ToastrService).warning('Usuário não autenticado. Efetue login.')
    inject(Router).navigate(['/login'])
    return false
  }
};
