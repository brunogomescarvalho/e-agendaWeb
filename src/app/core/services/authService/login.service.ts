import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { catchError, tap, throwError } from 'rxjs';
import { LoginUsuarioViewModel } from '../../../views/login/models/login.view-model';
import { TokenUsuario } from 'src/app/views/login/models/token.view-model';

@Injectable()
export class LoginService {

  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/autenticar'

  constructor(private http: HttpClient) { }

  public autenticar(usuario: LoginUsuarioViewModel) {
    return this.http.post(this.endpoint, usuario)
      .pipe(
        tap((res: any) => {
          if (res.sucesso == true) {
            this.salvarToken(res)
          }
        }),
        catchError((err: HttpErrorResponse) =>
          this.processarErro(err)
        ))
  }
  private processarErro(err: HttpErrorResponse): any {
    if (err.status == 400)
      return throwError(() => new Error("Verifique o e-mail e a senha ou efetue seu cadastro"))
    return throwError(() => new Error('Ocorreu um erro ao efetuar sua solicitação, tente novamente mais tarde'))
  }


  private salvarToken(res: any): void {
    const token: TokenUsuario = {
      chave: res.dados.chave,
      usuario: res.dados.usuarioToken,
      dataExpiracao: res.dados.dataExpiracao,
    }

    localStorage.setItem('tokenEAgenda', JSON.stringify(token))
  }

}

