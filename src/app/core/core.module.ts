import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './authService/login.service';
import { UsuarioService } from './usuarioService/usuario.service';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    LoginService,
    UsuarioService
  ]
})
export class CoreModule { }
