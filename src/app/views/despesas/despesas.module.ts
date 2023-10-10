import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormularioDespesasComponent } from './componentes/formulario-despesas/formulario-despesas.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DespesasRouteModule } from './router-module/despesas.router-module';
import { CategoriaService } from '../categorias/service/categoria.service';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { CardDespesasComponent } from './componentes/card-despesas/card-despesas.component';
import { DespesasService } from './service/despesas.service';
import { EditarDespesasComponent } from './editar-despesas/editar-despesas.component';



@NgModule({
  declarations: [
    FormularioDespesasComponent,
    ListarDespesasComponent,
    InserirDespesaComponent,
    CardDespesasComponent,
    EditarDespesasComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    DespesasRouteModule,
    FormsModule
  ],
  providers: [
    CategoriaService,
    DespesasService,
    DatePipe
  ]
})
export class DespesasModule { }
