import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { ItemTarefaViewModel } from '../../models/itens-tarefas/item-tarefa.view-model';

export type CardItemTarefa = 'cadastrar' | 'editar'

@Component({
  selector: 'app-card-itens-tarefa',
  templateUrl: './card-itens-tarefa.component.html',
  styleUrls: ['./card-itens-tarefa.component.css']
})


export class CardItensTarefaComponent {
  @Input({ required: true }) item!: ItemTarefaViewModel

  @Output() onFinalizarItem = new EventEmitter()

  @Output() onExcluirItem = new EventEmitter()

  @Input({ required: true }) tipoCard!: CardItemTarefa


  finalizar(item: ItemTarefaViewModel) {
    this.onFinalizarItem.emit(item)
  }

  removerItem(item: ItemTarefaViewModel) {
    this.onExcluirItem.emit(item)
  }
}
