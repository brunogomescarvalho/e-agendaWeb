import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListarContatosViewModel } from '../../models/listar-contato.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
  tema = 'primary'

  @Output() onExcluirCard = new EventEmitter<ListarContatosViewModel>()

  @Output() onEditarCard = new EventEmitter<ListarContatosViewModel>()

  @Input() contato!: ListarContatosViewModel

  editar(contato: ListarContatosViewModel) {
    this.onEditarCard.emit(contato)
  }

  excluir(contato: ListarContatosViewModel) {
    this.onExcluirCard.emit(contato)
  }


}
