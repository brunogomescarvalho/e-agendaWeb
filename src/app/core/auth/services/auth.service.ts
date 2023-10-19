import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginUsuarioViewModel } from 'src/app/views/login/models/login.view-model';
import { FormRegistroUsuarioViewModel } from 'src/app/views/registro/models/form-registro.view-model';
import { LocalStorageService } from './localStorage.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/'
  constructor(
    private httpService: HttpClient,
    private localStorage: LocalStorageService,
    private usuarioService: UsuarioService) { }

  public registrar(despesa: FormRegistroUsuarioViewModel) {
    return this.httpService.post(this.endpoint + 'registrar', despesa)
      .pipe(catchError((erro: HttpErrorResponse) => erro.processarErro()))

  }

  public autenticar(usuario: LoginUsuarioViewModel) {
    return this.httpService.post(this.endpoint + 'autenticar', usuario)
      .pipe(
        tap((res: any) => {
          if (res.sucesso == true) {
            this.localStorage.salvarToken(res)
          }
        }),
        catchError((err: HttpErrorResponse) =>
          this.processarErro(err)
        ))
  }

  public logout(): Observable<any> {
    return this.httpService
      .post<any>(this.endpoint + 'sair', {})
      .pipe(
        tap(() => this.usuarioService.logoutUsuario()),
        tap(() => this.localStorage.limparDadosLocais())
      );
  }

  private processarErro(err: HttpErrorResponse): any {
    if (err.status == 400)
      return throwError(() => new Error("Verifique o e-mail e a senha ou efetue seu cadastro"))
    return throwError(() => new Error('Ocorreu um erro ao efetuar sua solicitação, tente novamente mais tarde'))
  }



}
