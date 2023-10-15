import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './services/authService/login.service';
import { UsuarioService } from './services/usuarioService/usuario.service';
import { ModalComponent } from './componentes/modal/modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    ModalComponent
  ],
  providers: [
    LoginService,
    UsuarioService
  ]
})
export class CoreModule { }
