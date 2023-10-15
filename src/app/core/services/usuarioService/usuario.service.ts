import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { TokenUsuario } from 'src/app/views/login/models/token.view-model';

@Injectable()
export class UsuarioService {

  constructor() {
    if (this.tokenValido())
      this.logarUsario(this.obterUsuarioLogado())
  }

  usuarioSubject = new BehaviorSubject<TokenUsuario | null>(null)

  public logarUsario(usuario: TokenUsuario) {
    this.usuarioSubject.next(usuario)
  }

  public logoutUsuario() {
    this.usuarioSubject.next(null)
  }

  public usuarioLogado() {
    return this.usuarioSubject.asObservable().pipe(shareReplay())
  }

  public tokenValido(): boolean {
    const token = JSON.parse(localStorage.getItem('tokenEAgenda')!)

    if (!token) return false

    const hoje = new Date()

    return hoje < new Date(token.dataExpiracao)

  }

  public obterUsuarioLogado(): TokenUsuario {
    return JSON.parse(localStorage.getItem('tokenEAgenda')!) as TokenUsuario
  }
}
