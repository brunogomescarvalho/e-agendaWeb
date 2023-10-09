import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaCardComponent } from './componentes/categoria-card/categoria-card.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CategoriasRouterModule } from './router-module/categorias.router-module';
import { CategoriaService } from './service/categoria.service';
import { FormularioCategoriaComponent } from './componentes/formulario-categoria/formulario-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';



@NgModule({
  declarations: [
    CategoriaCardComponent,
    ListarCategoriasComponent,
    FormularioCategoriaComponent,
    InserirCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRouterModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriasModule { }
