import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { FormularioTarefaComponent } from './componentes/formulario-tarefa/formulario-tarefa.component';
import { CardTarefaComponent } from './componentes/card-tarefa/card-tarefa.component';
import { TarefasRouterModule } from './router-module/tarefa.router-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardItensTarefaComponent } from './componentes/card-itens-tarefa/card-itens-tarefa.component';
import { TarefasService } from './service/tarefas.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalhesTarefaComponent } from './detalhes-tarefa/detalhes-tarefa.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    InserirTarefaComponent,
    EditarTarefaComponent,
    ListarTarefasComponent,
    ExcluirTarefaComponent,
    FormularioTarefaComponent,
    CardTarefaComponent,
    CardItensTarefaComponent,
    DetalhesTarefaComponent
    
  ],
  imports: [
    CommonModule,
    TarefasRouterModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    CoreModule
  ],
  providers:[
    TarefasService
  ]
})
export class TarefasModule { }
