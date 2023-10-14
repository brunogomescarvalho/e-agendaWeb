import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemTarefaViewModel } from '../../models/itens-tarefas/item-tarefa.view-model';

@Component({
  selector: 'app-card-itens-tarefa',
  templateUrl: './card-itens-tarefa.component.html',
  styleUrls: ['./card-itens-tarefa.component.css']
})
export class CardItensTarefaComponent {
  @Input() item!: ItemTarefaViewModel

  @Output() onFinalizarItem = new EventEmitter()

  @Output() onExcluirItem = new EventEmitter()


  finalizar(item: ItemTarefaViewModel) {
    this.onFinalizarItem.emit(item)
  }

  removerItem(item: ItemTarefaViewModel) {
    this.onExcluirItem.emit(item)
  }
}
