import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormularioCompromissoComponent } from './componentes/formulario-compromisso/formulario-compromisso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ContatoService } from '../contatos/service/contato.service';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { CompromissoService } from './service/compromisso.service';
import { CardCompromissoComponent } from './componentes/card-compromisso/card-compromisso.component';
import { EditarCompromissosComponent } from './editar-compromissos/editar-compromissos.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { ContatosModule } from '../contatos/contatos.module';
import { CompromissosRouterModule } from './router-module/compromissos.router.module';
import { DetalhesCompromissoComponent } from './detalhes-compromisso/detalhes-compromisso.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroCompromissosModalComponent } from './componentes/filtro-compromissos.modal/filtro-compromissos.modal.component';



@NgModule({
  declarations: [
    FormularioCompromissoComponent,
    InserirCompromissoComponent,
    ListarCompromissosComponent,
    CardCompromissoComponent,
    EditarCompromissosComponent,
    ExcluirCompromissoComponent,
    DetalhesCompromissoComponent,
    FiltroCompromissosModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompromissosRouterModule,
    ContatosModule,
    NgbTooltipModule
  ],
  providers: [
    ContatoService,
    CompromissoService,
    DatePipe
  ]
})
export class CompromissosModule { }
