import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarTarefasViewModel } from '../../models/tarefas/listar-tarefa.view-model';

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.css']
})
export class CardTarefaComponent {
  @Input({ required: true }) tarefa!: ListarTarefasViewModel

  @Output() onExcluirTarefa = new EventEmitter<ListarTarefasViewModel>()

  @Output() onEditarTarefa = new EventEmitter<ListarTarefasViewModel>()

  @Output() onDetalhesTarefa = new EventEmitter<ListarTarefasViewModel>()

  public editar(tarefa: ListarTarefasViewModel) {
    this.onEditarTarefa.emit(tarefa)
  }
  public excluir(tarefa: ListarTarefasViewModel) {
    this.onExcluirTarefa.emit(tarefa)
  }
  public detalhes(tarefa: ListarTarefasViewModel) {
    this.onDetalhesTarefa.emit(tarefa)
  }
}
