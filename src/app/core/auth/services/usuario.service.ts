import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { TokenUsuario } from 'src/app/views/login/models/token.view-model';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class UsuarioService {

  usuarioSubject: BehaviorSubject<TokenUsuario | null>

  constructor(private locaStorage: LocalStorageService) {
    this.usuarioSubject = new BehaviorSubject<TokenUsuario | null>(null)
  }

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
    const token = this.locaStorage.obterUsuarioLogado()

    if (!token) return false

    const hoje = new Date()

    return hoje < new Date(token.dataExpiracao)

  }

  public logarUsuarioSalvo() {
    if (this.tokenValido())
      this.logarUsario(this.locaStorage.obterUsuarioLogado())
  }

}
