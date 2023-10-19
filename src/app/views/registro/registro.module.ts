import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRouterModule } from './router-module/registro.router-module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

@NgModule({
  declarations: [ RegistrarUsuarioComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroRouterModule,
  ]
 
})
export class RegistroModule { }
