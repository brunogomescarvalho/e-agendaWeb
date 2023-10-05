import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormularioCompromissoComponent } from './componentes/formulario-compromisso/formulario-compromisso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ContatoService } from '../contatos/service/contato.service';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { RouterModule } from '@angular/router';
import { CompromissoService } from './service/compromisso.service';
import { CardCompromissoComponent } from './componentes/card-compromisso/card-compromisso.component';
import { EditarCompromissosComponent } from './editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';



@NgModule({
  declarations: [
    FormularioCompromissoComponent,
    InserirCompromissoComponent,
    ListarCompromissosComponent,
    CardCompromissoComponent,
    EditarCompromissosComponent,
    ExcluirCompromissoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ContatoService,
    CompromissoService,
    DatePipe 
  ]
})
export class CompromissosModule { }
