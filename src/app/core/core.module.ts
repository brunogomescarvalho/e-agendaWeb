import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService } from './auth/services/usuario.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    AuthModule
  ],
  exports: [
    NavbarComponent,
    AuthModule
  ],
  providers: [
    UsuarioService,
  ]
})
export class CoreModule { }
