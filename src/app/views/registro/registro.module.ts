import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroService } from './service/registro.service';
import { RegistroRouterModule } from './router-module/registro.router-module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

@NgModule({
  declarations: [ RegistrarUsuarioComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroRouterModule,
  ],
  providers:[
    RegistroService
  ]
})
export class RegistroModule { }
