import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuarioService/usuario.service';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:
  [
    UsuarioService
  ]
})
export class DashboardModule { }
