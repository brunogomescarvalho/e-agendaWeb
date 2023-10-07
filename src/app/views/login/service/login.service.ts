import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { catchError, tap, throwError } from 'rxjs';
import { LoginUsuarioViewModel } from '../models/login.view-model';

@Injectable()
export class LoginService {

  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/autenticar'

  public onInformarLogin = new EventEmitter<boolean>()

  constructor(private http: HttpClient) { }

  public autenticar(usuario: LoginUsuarioViewModel) {
    return this.http.post(this.endpoint, usuario)
      .pipe(tap((res: any) => { if (res.sucesso == true) this.salvarToken(res) }),
        catchError((err: HttpErrorResponse) =>
          throwError(() => new Error(err.message))))
  }

  public tokenValido(): boolean {
    const token = JSON.parse(localStorage.getItem('tokenEAgenda')!)

    if (!token) return false

    const hoje = new Date()

    return hoje < new Date(token.dataExpiracao)

  }

  private salvarToken(aut: any): void {
    const token = {
      chave: aut.dados.chave,
      usuario: aut.dados.usuarioToken,
      dataExpiracao: aut.dados.dataExpiracao,
    }

    localStorage.setItem('tokenEAgenda', JSON.stringify(token))
    this.onInformarLogin.emit(true)
  }

  public obterUsuarioLogado(): string {
    let token = JSON.parse(localStorage.getItem('tokenEAgenda')!)

    return token.usuario.nome
  }

}
