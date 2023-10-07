import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/views/login/service/login.service';

export const usuarioAutenticadoGuard: CanActivateFn = () => {
  if (inject(LoginService).tokenValido())
    return true;
  else {
    (inject(Router).navigate(['/login']))
    return false
  }
};
