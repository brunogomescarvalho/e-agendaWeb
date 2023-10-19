import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/localStorage.service';
import { UsuarioService } from './services/usuario.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [LocalStorageService, UsuarioService, AuthService]
})
export class AuthModule { }
