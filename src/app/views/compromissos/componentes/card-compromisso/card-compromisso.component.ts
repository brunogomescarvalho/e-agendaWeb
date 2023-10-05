import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListaCompromissosViewModel } from '../../models/listar-compromissos.view-model';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent {

  tema = 'secondary'

  @Input({ required: true }) compromisso!: ListaCompromissosViewModel

  @Output() onExcluirCompromisso = new EventEmitter<ListaCompromissosViewModel>()

  @Output() onEditarCompromisso = new EventEmitter<ListaCompromissosViewModel>()

  public editar(compromisso: ListaCompromissosViewModel) {
    this.onEditarCompromisso.emit(compromisso)
  }
  public excluir(compromisso: any) {
    this.onExcluirCompromisso.emit(compromisso)
  }
}
